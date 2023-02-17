package com.example.account_proj;

import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Calendar;

public class SecondActivity extends AppCompatActivity implements View.OnClickListener, DatePickerDialog.OnDateSetListener,
        AdapterView.OnItemSelectedListener {
    Calendar c = Calendar.getInstance();
    TextView edtDate;
    EditText edtMemo, edtPrice;
    Spinner spCtg, spRec;

    String[] itemSet;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        edtDate = (TextView)findViewById(R.id.edtDate);
        edtDate.setOnClickListener(this);
        edtMemo = (EditText)findViewById(R.id.edtMemo);
        edtPrice = (EditText)findViewById(R.id.edtPrice);

        spRec = (Spinner) findViewById(R.id.spRec);
        spRec.setOnItemSelectedListener(this);
        spCtg = (Spinner) findViewById(R.id.spCtg);
    }
    public void setDate(){
        new DatePickerDialog(this, this,
                c.get(Calendar.YEAR),
                c.get(Calendar.MONTH),
                c.get(Calendar.DAY_OF_MONTH))
                .show();
    }
    public void onDateSet(DatePicker v, int y, int m, int d) {
        edtDate.setText(y+"/"+(m+1)+"/"+d);
    }
    @Override
    public void onClick(View v) {
        if (v == edtDate) {
            setDate();
        }
    }


    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        String[] expItems = getResources().getStringArray(R.array.expItems);
        String[] incItems = getResources().getStringArray(R.array.incItems);

        if (position == 0)
            itemSet = incItems;
        else if (position == 1)
            itemSet = expItems;

        ArrayAdapter<String> itemAd =
                new ArrayAdapter<>(this,
                        android.R.layout.simple_spinner_item,
                        itemSet);
        itemAd.setDropDownViewResource(
                android.R.layout.simple_spinner_dropdown_item);
        spCtg.setAdapter(itemAd);
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }

    public void submit(View v){
        //startActivity(new Intent(this, MainActivity.class));
        if(edtDate.getText().toString().isEmpty() ||
                edtPrice.getText().toString().isEmpty()){
            String strSubmitCheck = getResources().getString(R.string.strSubmitCheck);
            Toast.makeText(this, strSubmitCheck, Toast.LENGTH_SHORT).show();
        }
        else if(!edtDate.getText().toString().isEmpty() &&
                !edtPrice.getText().toString().isEmpty()) {
            Intent it2 = new Intent();
            it2.putExtra("Record", spRec.getSelectedItem().toString());
            it2.putExtra("Date", edtDate.getText().toString());
            it2.putExtra("Price", edtPrice.getText().toString());
            it2.putExtra("Category", spCtg.getSelectedItem().toString());
            it2.putExtra("Memo", edtMemo.getText().toString());
            setResult(RESULT_OK, it2);
            finish();
        }
    }
    public void goBack(View v){
        setResult(RESULT_CANCELED);
        finish();
    }
}