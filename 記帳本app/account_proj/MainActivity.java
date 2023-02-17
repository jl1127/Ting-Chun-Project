package com.example.account_proj;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    static final String db_name="testDB";	// database name
    static final String tb_name="account2";		// table name
    SQLiteDatabase db;	//database
    Cursor c;

    int totalMoney; // total money
    String[] recItems;
    TextView txv;
    String strRecord, strDate, strPrice, strCategory, strMemo;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recItems = getResources().getStringArray(R.array.recItems);
        txv=(TextView)findViewById(R.id.txv);


        // Open or Build Database
        db = openOrCreateDatabase(db_name,  Context.MODE_PRIVATE, null);

        String createTable="CREATE TABLE IF NOT EXISTS " +
                tb_name +			// table name
                "(record VARCHAR(16), " +	//record field
                "date VARCHAR(16), " +	//date field
                "price VARCHAR(16), " +	//price field
                "category VARCHAR(16), " +	//category field
                "memo VARCHAR(64), " +  //memo field
                "total VARINT(16))";	//total field
        db.execSQL(createTable);	// build table

        // Search table content
        c = db.rawQuery("SELECT * FROM " + tb_name, null);
        if (c.getCount() == 0) {
            totalMoney = 0;
        }
        /*else{
            c.moveToLast();
            totalMoney = c.getInt(5);
        }*/
        // Output
        if (c.moveToFirst()){
            String str ="總共有" + c.getCount() +"筆帳目\n";
            //str += "存款:" + Integer.valueOf(totalMoney) + "元\n";
            str += "-----\n";
            do{
                str += "record:" + c.getString(0) +"\n";
                str += "date:" + c.getString(1) +"\n";
                str += "price:" + c.getString(2) +"\n";
                str += "category:" + c.getString(3) +"\n";
                str += "memo:" + c.getString(4) +"\n";
                str += "-----\n";
            } while (c.moveToNext());
            txv.setText(str);
        }
        db.close();		// Close database
    }

    private void addData(String record, String date, String price, String category, String memo, Integer total) {
        ContentValues cv = new ContentValues(5);	// Build object w/ 5 value
        cv.put("record", record);
        cv.put("date", date);
        cv.put("price", price);
        cv.put("category", category);
        cv.put("memo", memo);
        cv.put("total", total);

        db.insert(tb_name, null, cv);	// insert data to database
    }

    public void goSecond(View v){
        Intent it = new Intent(this, SecondActivity.class);
        startActivityForResult(it, 100);
    }
    public void leave(View v){
        finish();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent it){
        super.onActivityResult(requestCode, resultCode, it);
        if(resultCode == RESULT_OK){
            //Read IntentExtra;
            strRecord = it.getStringExtra("Record");
            strDate = it.getStringExtra("Date");
            strPrice = it.getStringExtra("Price");
            strCategory = it.getStringExtra("Category");
            strMemo = it.getStringExtra("Memo");

            db = openOrCreateDatabase(db_name,  Context.MODE_PRIVATE, null);


            // Search table content
            c = db.rawQuery("SELECT * FROM " + tb_name, null);
            if (c.getCount() == 0) {
                totalMoney = 0;
            }
            else{
                int x = Integer.valueOf(strPrice);
                if( strRecord.equals(recItems[0])){ //Inc
                    totalMoney = totalMoney + x;
                }
                else if (strRecord.equals(recItems[1])){ //Exp
                    totalMoney = totalMoney - x;
                }
            }

            // Insert the data returned from SecondActivity
            addData(strRecord, strDate, strPrice, strCategory, strMemo, totalMoney);

            c = db.rawQuery("SELECT * FROM " + tb_name, null);
            // Output
            if (c.moveToFirst()){
                String str ="總共有" + c.getCount() +"筆帳目\n";
                str += "存款:" + Integer.toString(totalMoney) + "元\n";
                str += "-----\n";
                do{
                    str += "record:" + c.getString(0) +"\n";
                    str += "date:" + c.getString(1) +"\n";
                    str += "price:" + c.getString(2) +"\n";
                    str += "category:" + c.getString(3) +"\n";
                    str += "memo:" + c.getString(4) +"\n";
                    str += "-----\n";
                } while (c.moveToNext());
                txv.setText(str);
            }
            db.close();		// Close database
        }
    }
}