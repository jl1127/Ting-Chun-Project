from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import os
import re
# from .models import ServiceContract
from .utils.Marker import getContract


def index(request):
    return render(request, 'explain/index.html')

def upload_contract(request):
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        if uploaded_file.name.endswith('.docx'):
            fs = FileSystemStorage()
            filename = fs.save(uploaded_file.name, uploaded_file)
            return redirect('read_contract', filename=filename)
        else:
            return render(request, 'explain/index.html', {'error': '上傳失敗，文件類型不支持'})

    return render(request, 'explain/index.html')

def read_contract(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    filename_marker = "static\\Marker.csv"
    
    from .utils.Marker import getContract

    Contract, dictMarker = getContract(file_path, filename_marker)
    # Key = {}
    # Value = {}
    # for key, value in dictMarker.items():
    #     Key.append(key)
    #     Value.append(value)
    #     print(key)

    # for key, value in dictMarker.items():
    #     Contract = re.sub(f"({key})", f'<span class="tooltip" title="{value}">\\1</span>', Contract, flags=re.IGNORECASE)
    #     print(key)
    
    
    key_value_str = ",".join([f"{k}:{v}" for k, v in dictMarker.items()])
        
    data = {"contract" : Contract, "dict" : key_value_str}
    
    return render(request, 'explain/read_contract.html', data)
