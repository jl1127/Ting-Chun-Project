import pandas as pd
from bs4 import BeautifulSoup
import mammoth

# def getContract(filename_contract, filename_marker):
#     # 讀取CSV文件並創建DataFrame
#     df = pd.read_csv(filename_marker, header=None)
    
#     # 檢查DataFrame的結構
#     # print(df.head())

#     # 確保你正確地引用了列
#     terms_dict = pd.Series(df[1].values, index=df[0]).to_dict()
    
#     # 載入Word文件並轉換為HTML
#     with open(filename_contract, "rb") as docx_file:
#         result = mammoth.convert_to_html(docx_file)
#         html_content = result.value
    
#     # 使用BeautifulSoup處理HTML內容
#     soup = BeautifulSoup(html_content, "html.parser")
#     Contract = str(soup)
    
#     return Contract, terms_dict

def getContract(filename_contract, filename_marker):
    
    #資料庫用：df = pd.DataFrame(filename_marker)
    df = pd.read_csv(filename_marker)

    # 載入Word文件並轉換為HTML
    with open(filename_contract, "rb") as docx_file:
        result = mammoth.convert_to_html(docx_file)
        html_content = result.value

    # 使用BeautifulSoup來解析HTML內容
    soup = BeautifulSoup(html_content, 'html.parser')

    #資料庫用：terms_dict = pd.Series(df[1].values, index=df[0]).to_dict()
    terms_dict = dict(zip(df['N.'], df['Exp']))
    dict_found = {}

    # 搜索條款和解釋是否出現在文檔中
    for term, explanation in terms_dict.items():
        if term in soup.text:
            dict_found[term] = explanation

    return html_content, dict_found