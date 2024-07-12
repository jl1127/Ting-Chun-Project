from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from contract_generator.serializers import ServiceContractSerializer
from contract_generator.serializers import PurchaseContractSerializer
from contract_generator.service import fetch_contract_generation_part_from_s3
from contract_generator.service import fetch_contract_template_part_from_s3
from contract_generator.service import fetch_related_law_from_knowledgebase
from contract_generator.service import end_aws_bedrock_agent_session
from contract_generator.service import clean_user_request_json
from contract_generator.service import service_generate_prompt
from contract_generator.service import purchase_generate_prompt
from contract_generator.service import generate_contract
import json

def web_index(request):
    return render(request, 'generate/index.html')

def web_service_contract(request):
    return render(request, 'generate/serviceContract.html')

def web_purchase_contract(request):
    return render(request, 'generate/purchaseContract.html')

def web_generate_contract(request):
    return render(request, 'generate/generateContract.html')

@api_view(['POST'])
def service_contract_generate_api(request):
    serializer = ServiceContractSerializer(data=request.data)
    if serializer.is_valid():
        # 前端傳遞的使用者輸入
        user_request = serializer.data
        print(user_request)
        # serializer.save()

        # 從 s3 儲存桶取得服務合約生成模板
        contract_generation_part = fetch_contract_generation_part_from_s3(user_request)
        # print(contract_generation_part)

        # 從 s3 儲存桶取得服務合約固定模板
        contract_template_part = fetch_contract_template_part_from_s3(user_request)
        # print(contract_template_part )

        # 從知識庫尋找與服務內容相關的規範
        related_law = fetch_related_law_from_knowledgebase(user_request)
        # print(related_law)

        # 關閉 agent session
        end_aws_bedrock_agent_session()

        # 處理 user_request 字串
        clean_user_request = clean_user_request_json(user_request)

        # 產生合約提示
        prompt = service_generate_prompt(contract_generation_part, related_law, clean_user_request)
        # print(prompt)

        # 產生合約
        contract_content = generate_contract(user_request, contract_template_part, prompt)
        print(contract_content)

        return JsonResponse({'contract_content': contract_content})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def purchase_contract_generate_api(request):
    serializer = PurchaseContractSerializer(data=request.data)
    if serializer.is_valid():
        # 前端傳遞的使用者輸入
        user_request = serializer.data
        print(user_request)
        # serializer.save()

        # 從 s3 儲存桶取得服務合約生成模板
        contract_generation_part = fetch_contract_generation_part_from_s3(user_request)
        # print(contract_generation_part)

        # 從 s3 儲存桶取得服務合約固定模板
        contract_template_part = fetch_contract_template_part_from_s3(user_request)
        # print(contract_template_part )

        # 從知識庫尋找與服務內容相關的規範
        related_law = fetch_related_law_from_knowledgebase(user_request)
        # print(related_law)

        # 關閉 agent session
        end_aws_bedrock_agent_session()

        # 處理 user_request 字串
        clean_user_request = clean_user_request_json(user_request)

        # 產生合約提示
        prompt = purchase_generate_prompt(contract_generation_part, related_law, clean_user_request)
  
        print(prompt)

        # 產生合約
        contract_content = generate_contract(user_request, contract_template_part, prompt)

        print(contract_content)

        return JsonResponse({'contract_content': contract_content})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

