# 處理 JSON 數據的反序列化和序列化
from rest_framework import serializers
from contract_generator.models import ServiceContract
from contract_generator.models import PurchaseContract

class ServiceContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceContract
        fields = '__all__'

class PurchaseContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseContract
        fields = '__all__'