from django.db import models

class ServiceContract(models.Model):
    contract_id = models.AutoField(primary_key=True)
    contract_type = models.CharField(max_length=64)
    company_a = models.CharField(max_length=255)
    company_b = models.CharField(max_length=255)
    contract_start_date = models.DateField()
    contract_end_date = models.DateField()
    service_description = models.TextField()
    service_detail = models.TextField()
    fee = models.TextField()
    payment_method = models.TextField()
    contract_content = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'service_contract'

class PurchaseContract(models.Model):
    contract_id = models.AutoField(primary_key=True)
    contract_type = models.CharField(max_length=64)
    company_a = models.CharField(max_length=255)
    company_b = models.CharField(max_length=255)
    contract_start_date = models.DateField()
    contract_end_date = models.DateField()
    purchase_description = models.TextField()
    purchase_detail = models.TextField()
    total_fee = models.TextField()
    bankName = models.TextField()
    accountName = models.TextField()
    accountNum = models.TextField()
    contract_content = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'purchase_contract'

# CREATE TABLE service_contract (
#     contract_id INT AUTO_INCREMENT PRIMARY KEY,
#     contract_type VARCHAR(64) NOT NULL,
#     company_a VARCHAR(255) NOT NULL,
#     company_b VARCHAR(255) NOT NULL,
#     contract_start_date DATE NOT NULL,
#     contract_end_date DATE NOT NULL,
#     service_description TEXT NOT NULL,
#     service_detail  TEXT NOT NULL,
#     fee TEXT  NOT NULL,
#     payment_method TEXT NOT NULL,
#     contract_content TEXT
# );