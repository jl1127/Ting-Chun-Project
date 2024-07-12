import os
import time
import re
import boto3
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

ACCESS_KEY = os.getenv('ACCESS_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')

session = boto3.Session(
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY
)

def fetch_contract_generation_part_from_s3(user_request):
    if(user_request['contract_type'] == "service"):
        object_key = 'contract/contract_generation_part/service_contract_generation.txt'
    elif(user_request['contract_type'] == "purchase"):
        object_key = 'contract/contract_generation_part/purchase_contract_generation.txt'
    s3_client = session.client('s3')
    bucket_name = 'kappa-data-00'
    response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
    contract_generation_part = response['Body'].read()
    print("fetch contract generation part from s3")
    return contract_generation_part.decode('utf-8')

def fetch_contract_template_part_from_s3(user_request):
    if(user_request['contract_type'] == "service"):
        object_key = 'contract/contract_template_part/service_contract_template.txt'
    elif(user_request['contract_type'] == "purchase"):
        object_key = 'contract/contract_template_part/purchase_contract_template.txt'
    s3_client = session.client('s3')
    bucket_name = 'kappa-data-00'
    response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
    contract_generation_part = response['Body'].read()
    print("fetch contract template part from s3")
    return contract_generation_part.decode('utf-8')

def fetch_related_law_from_knowledgebase(user_request):
    bedrock_agent_runtime_client = session.client('bedrock-agent-runtime', region_name='us-east-1')

    if user_request['contract_type'] == 'service':
        description = user_request['service_description']
    elif user_request['contract_type'] == 'purchase':
        description = user_request['purchase_description']  

    response = bedrock_agent_runtime_client.invoke_agent(
        agentId="GZYUM4YIAZ",
        agentAliasId="EPUPRSKWT8",
        sessionId="test_01",
        inputText=description,
    )
    time.sleep(5)
    for event in response.get("completion"):
        continue
    related_law = event["chunk"]["attribution"]["citations"][0]["generatedResponsePart"]["textResponsePart"]["text"]
    print("fetch related law from bedrock knowledge base")
    return related_law

def end_aws_bedrock_agent_session():
    bedrock_agent_runtime_client = session.client('bedrock-agent-runtime', region_name='us-east-1')

    response = bedrock_agent_runtime_client.invoke_agent(
        agentId="GZYUM4YIAZ",
        agentAliasId="EPUPRSKWT8",
        sessionId="test_01",
        inputText="/end",
        endSession=True
    )
    print("end bedrock agent session")
    time.sleep(5)

def clean_user_request_json(user_request):
    user_request_string = str(user_request)
    json_str = user_request_string.strip('{}')
    json_str = re.sub(r"'contract_type': '.*?',?\s*", '', json_str)
    json_str = re.sub(r"'contract_content': None,?\s*", '', json_str)
    return json_str

def service_generate_prompt(contract_generation_part, related_law, clean_user_request):
    prompt = f"""
<template>
{contract_generation_part}
</template>

<related law>
{related_law}
</related law>

<input>
{clean_user_request}
<input>

<prompt>
根據<template>中的合約模板，以及<law>中的參考規範與法律，以及<input>中的使用者合約需求，生成合約內容。
合約模板中出來的合約條款幫我用html格式<contract>包住，合約名稱與 <template> 中內容相同以 <h1> 標記，合約大項與 <template> 中內容相同以 <h2> 標記
合約大項中的細項以(1)-(10)標記，合約細項中的更細項以1.-10.標記。
輸出格式如下：
第一條、 立約人
第二條、 合約大項
    1. (1) 合約細項
        1. 1. 更細項
</prompt>
"""
    return prompt

def purchase_generate_prompt(contract_generation_part, related_law, clean_user_request):
    prompt = f"""
<template>
{contract_generation_part}
</template>

<related law>
{related_law}
</related law>

<input>
{clean_user_request}
<input>

<prompt>
根據<template>中的合約模板，以及<law>中的參考規範與法律，以及<input>中的使用者合約需求，生成一份合約，並將採購內容製作成表格放入最後方設備清單（附件一），
合約模板中出來的合約條款幫我用html格式<contract>包住，而最後的設備清單表格請以 html 的 table 格式輸出。合約名稱與 <template> 中內容相同以 <h1> 標記，合約大項與 <template> 中內容相同以 <h2> 標記
合約大項中的細項以(1)-(10)標記，合約細項中的更細項以1.-10.標記。
輸出格式如下：
第一條、 立約人
第二條、 合約大項
    1. (1) 合約細項
        1. 1. 更細項

</prompt>
"""
    return prompt

def clean_claude_response(user_request, results):
    if(user_request['contract_type'] == "service"):
        new_results = re.sub(r".*?## 服務合約", '## 服務合約', results, flags=re.DOTALL)
    elif(user_request['contract_type'] == "purchase"):
        new_results = re.sub(r".*?## 採購合約", '## 採購合約', results, flags=re.DOTALL)
    return new_results


def generate_contract(user_request, contract_template_part, prompt):
    body = json.dumps({
        "max_tokens": 4096,
        "messages": [{"role": "user", "content": prompt}],
        "anthropic_version": "bedrock-2023-05-31",
        "temperature": 0
    })
    bedrock_client = session.client('bedrock-runtime', region_name='us-east-1')
    response = bedrock_client.invoke_model(body=body, modelId='anthropic.claude-3-sonnet-20240229-v1:0')
    response_body = json.loads(response.get("body").read())
    results = response_body.get("content")[0].get("text")
    
    # 確保正確傳遞 user_request 參數
    new_results = clean_claude_response(user_request, results)
    # 合併模板與結果，並進行後續處理
    final_contract = process_contract(new_results, contract_template_part)
    return final_contract

    # new_results = clean_claude_response(results)
    # # contract_content = new_results + contract_template_part
    # final_contract = process_contract(new_results, contract_template_part)

    # return final_contract

def process_contract(new_results, contract_template_part):

    chinese_to_digit = {
        '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
        '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
    }
    
    def chinese_to_arabic(chinese_num):

        return chinese_to_digit.get(chinese_num, None)

    sections = list(re.finditer(r'第([一二三四五六七八九十]+)條', new_results))
    
    contract_end = re.search(r'</contract>', new_results)
    
    if not sections or not contract_end:
        return new_results
    
    closest_section = None
    min_distance = float('inf')
    for section in sections:
        distance = contract_end.start() - section.start()
        if 0 < distance < min_distance:
            min_distance = distance
            closest_section = section
    
    if closest_section:
        chinese_num = closest_section.group(1)
        arabic_num = chinese_to_arabic(chinese_num)
        if arabic_num is None:
            return new_results
        start_num = arabic_num + 1 
        
        def replace_func(match):
            nonlocal start_num
            replaced_text = f"第{start_num}條"
            start_num += 1
            return replaced_text

        updated_fixcontract = re.sub(r'第i條', replace_func, contract_template_part)

        modified_text = re.sub(r'</contract>', updated_fixcontract, new_results)
        
        return modified_text
    else:
        return new_results