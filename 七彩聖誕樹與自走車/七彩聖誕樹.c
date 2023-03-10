#include <Adafruit_NeoPixel.h>
//燈環 16顆LED,燈帶14個LED, DI接到D7
Adafruit_NeoPixel   Ring = Adafruit_NeoPixel(14, 8);//燈帶
Adafruit_NeoPixel   ring = Adafruit_NeoPixel(16, 6);//燈環
//呼吸燈
void breathing(int r, int g, int b) {
  float bright = (exp(sin(millis() / 1000.0 * PI)) - 0.36787944) * 108.0;
  bright = bright / 255;     // 先除 255, 然後下一行再乘以指定的 3 原色值
  for (int i = 0; i < ring.numPixels(); i++) {
    ring.setPixelColor(i, bright * r, bright * g, bright * b);
   }
  ring.show();
}
void setup() {
  ring.begin();                    
  ring.setBrightness(32);           // 0~255
  ring.show();
  Ring.begin();                    
  Ring.setBrightness(32);           // 0~255
  Ring.show();                            
}
void loop() {
  //隨機變色
 for (int i = 0; i < Ring.numPixels(); i++) {
// Ring.clear();   //單顆 
    Ring.setPixelColor(i,random(0,256), random(0,256), random(0,256));
    Ring.show();
    delay(100);
  }
  //呼吸燈
  breathing(255, 255, 0);
}
