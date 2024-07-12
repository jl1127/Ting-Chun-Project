"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from myapp.views import change_project_name, create_project, delete_project, get_all_projects, main_page_html, create_user, login, select_current_project, send_message, start_page, test
from contract_generator.views import service_contract_generate_api, web_index, purchase_contract_generate_api, web_service_contract, web_purchase_contract, web_generate_contract
from contractapp.views import index, upload_contract, read_contract

urlpatterns = [
    path("admin/", admin.site.urls),
    path('create_user/', create_user),
    path('login/', login),                                                                                      # Login(In preccessed)
    path('contract_check/', main_page_html),                                                                    # 主頁
    path('', start_page),                                                                                       # 選功能頁面
    path('create_project/', create_project),                                                                    # 創建專案
    path('get_all_projects/', get_all_projects),                                                                # 獲取所有專案的歷史紀錄
    path('select_current_project/', select_current_project),                                                    # 變更當前專案
    path('send_message/', send_message),                                                                        # 發送訊息
    path('change_project_name/', change_project_name),                                                          # 修改專案名稱
    path('delete_project/', delete_project),                                                                    # 刪除專案

    path('contract_generator/', web_index, name='web_index'),                                                   # 合約生成首頁
    path('contract_generator/service_contract/', web_service_contract, name='web_service_contract'),            # 合約生成-服務合約
    path('contract_generator/purchase_contract/', web_purchase_contract, name='web_purchase_contract'),         # 合約生成-採購合約
    path('contract_generator/purchase_contract/purchase_contract_generate_api/', purchase_contract_generate_api, name='purchase_contract_generate_api'),
    path('contract_generator/generate_contract/', web_generate_contract, name='web_generate_contract'),         # 合約生成-生成合約
    path('contract_generator/service_contract/service_contract_generate_api/', service_contract_generate_api, name='service_contract_generate_api'),
    
    path('contract_explain/', index, name='index'),                                                             # 合約解釋首頁
    path('upload/', upload_contract, name='upload_contract'),                                                   # 合約上傳頁面
    path('read/<str:filename>/', read_contract, name='read_contract'),                                          # 合約解釋頁面
    # 測試 url
    path('test/', test),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


