module main (clk, reset, left, right, fire, segout, scanout/*, segout7SEG, scanout7SEG*/);
input clk, reset, left, right, fire;
output reg[7:0] segout;
output reg[2:0] scanout;
/*output reg[7:0] segout7SEG;
output reg[2:0] scanout7SEG;*/

reg [25:0] cnt_scan;
// Player
reg [2:0] x = 3, y = 7; 
reg [2:0] bulletX = 0, bulletY = 7, randnum;
reg [1:0] bulletNum = 15;
reg [1:0] bloodP = 3;
//Boss
reg [2:0] bossX = 3, bossY = 0; 
reg [2:0] bombX = 0, bombY = 7;
reg [1:0] bloodB = 10;

reg clk1, clk2;
reg [63:0] q;
reg [1:0] mode = 0;
//Score
/*
reg [3:0] sel;
reg [3:0] s0 = 4'h1;
reg [3:0] s1 = 4'h0;
reg [3:0] s2 = 4'h1;
reg [3:0] s3 = 4'h5;
reg [3:0] s4 = 4'h3;
*/

// Clock Running
always @(posedge clk)
begin
    cnt_scan <= cnt_scan + 1;
    if (cnt_scan == 06250000) begin
        cnt_scan <= 0;
        clk1 = ~clk1;
    end
    if (cnt_scan == 25000000)begin
        clk2 = ~clk2;
    end
end

// Modify Display Digit
always @(posedge clk1, negedge reset)
begin
    if(reset == 0) begin
        /* Initial */
        //Player
        x = 3;
        y = 7;
        bulletX = 3;
        bulletY = 7;
        //Boss
        bossX = 3;
        bossY = 0;
        bombX = 3;
        bombY = 0;
        //Score
        /*
        s0 <= 4'h1;
        s1 <= 4'h0;
        s2 <= 4'h1;
        s3 <= 4'h5;
        s4 <= 4'h3;
        */
        /* Display */
        q = 64'hffff_ffff_ffff_ffff;
        q[x + 8*y] = 1'b0;//Player
        //Boss
        q[bossX + 8*bossY] = 1'b0;//up
        q[bossX + 8*bossY - 1] = 1'b0;//left
        q[bossX + 8*bossY + 1] = 1'b0;//right
        q[bossX + 8*(bossY + 1)] = 1'b0;//down
    end
    else begin
        //-------------- GAME --------------
        if (mode == 0)begin
            q = q | 64'h00ff_ffff_ffff_ffff;
            // Player
            if (bulletY < 7)begin
                q[bulletX + 8*bulletY] = 1'b0;
                q[x + 8*y] = 1'b0;
                bulletY = bulletY - 1;
                if (bulletY == (bossY + 1) & bulletX == bossX)begin
                    bloodB <= bloodB - 1;
                    /*
                    if (s0 == 4'h1) begin//10->9
                        s0 <= 4'h0;
                        s1 <= 4'h9;
                    end
                    else begin//9->0
                        s1 <= s1 -1;
                    end  
                    */
                end
            end
            if (left == 0)begin
                q = q | 64'hff00_0000_0000_0000;
                x = x - 1;
                q[x + 8*y] = 1'b0;
            end
            else if (right == 0)begin
                q = q | 64'hff00_0000_0000_0000;
                x = x + 1;
                q[x + 8*y] = 1'b0;
            end
            if (fire == 0 & bulletNum != 0)begin
                bulletX = x;
                bulletY = y-1;
                bulletNum <= bulletNum - 1;
                /*
                if (s2 == 4'h1) begin
                    if ( (bulletNum - bulletNum%10)/10 == 0)begin
                        s3 <= 4'h9;
                    end
                    else if ( (bulletNum - bulletNum%10)/10 == 1) begin//15->11
                        s2 <= 4'h1;
                        s3 <= s2 - 1 ;
                    end
                end
                else begin//9->0
                    s2 <= 4'h0;
                    s3 <= s3 -1;
                end
                */
            end
            // Boss
            if (bombY > 1)begin
                q[bombX + 8*bombY] = 1'b0;
                q[bossX + 8*bossY] = 1'b0;
                q[bossX + 8*bossY - 1] = 1'b0;
                q[bossX + 8*bossY + 1] = 1'b0;
                q[bossX + 8*(bossY + 1)] = 1'b0;
                bombY = bombY + 1;
                if (bombY == y & bombX == x)begin
                    bloodP = bloodP - 1;
                    //s4 <= s4 - 1;
                end
            end
            /*
            if (left == 0)begin
                q = q | 64'h0000_0000_0000_00ff;//set [15:0] 1(off), others no change
                bossX = bossX - 1;
                q[bossX + 8*bossY] = 1'b0;
                q[bossX + 8*bossY - 1] = 1'b0;
                q[bossX + 8*bossY + 1] = 1'b0;
                q[bossX + 8*(bossY + 1)] = 1'b0;
            end
            else if (right == 0)begin
                q = q | 64'h0000_0000_0000_00ff;
                bossX = bossX + 1;
                q[bossX + 8*bossY] = 1'b0;
                q[bossX + 8*bossY - 1] = 1'b0;
                q[bossX + 8*bossY + 1] = 1'b0;
                q[bossX + 8*(bossY + 1)] = 1'b0;
            end
            if (fire == 0)begin
                bombX = bossX;
                bombY = bossY + 2;
            end
            */
            // Mode
            if (bloodP == 0)begin
                mode = 2;
            end
            else if (bloodB == 0)begin //fire -> bullet-1 -> bloodB-1
                mode = 1;//Win
            end
            else if (bulletNum == 0 && bloodB != 0)begin
                mode = 2;//Lose
            end
        end
        //-------------- WIN --------------
        else if (mode == 1)begin
            q[7:0] = 8'h00;
            q[15:8] = 8'b0100_0010;
            q[23:15] = 8'b1010_0101;
            q[31:23] = 8'h00;
            q[39:31] = 8'h00;
            q[47:39] = 8'b0100_0010;
            q[55:47] = 8'b0010_0100;
            q[63:55] = 8'b0001_1000;
        end
        //-------------- LOSE --------------
        else if (mode ==2)begin
            q[7:0] = 8'h00;
            q[15:8] = 8'b1110_0111;
            q[23:15] = 8'b0100_0010;
            q[31:23] = 8'b0100_0010;
            q[39:31] = 8'h00;
            q[47:39] = 8'b0001_1000;
            q[55:47] = 8'b0010_0100;
            q[63:55] = 8'h00;
        end
    end
end
always @(posedge clk2)
begin
    if (mode == 0)begin
        randnum = $urandom_range(2);
        if (randnum%3 == 0)begin
            q = q | 64'h0000_0000_0000_00ff;
            bossX = bossX + 1;
            q[bossX + 8*bossY] = 1'b0;
            q[bossX + 8*bossY - 1] = 1'b0;
            q[bossX + 8*bossY + 1] = 1'b0;
            q[bossX + 8*(bossY + 1)] = 1'b0;
        end
        else if(randnum%3 == 1)begin
            q = q | 64'h0000_0000_0000_00ff;//set [15:0] 1(off), others no change
            bossX = bossX - 1;
            q[bossX + 8*bossY] = 1'b0;
            q[bossX + 8*bossY - 1] = 1'b0;
            q[bossX + 8*bossY + 1] = 1'b0;
            q[bossX + 8*(bossY + 1)] = 1'b0;
        end
        else if(randnum%3 == 2)begin
            bombX = bossX;
            bombY = bossY + 2;
        end
    end
end
// Scan & Display 8X8 Martix
always @(cnt_scan[15:13])
begin
    scanout <= cnt_scan[15:13];
end
always @(scanout)
begin
    case (scanout)
        7: segout = q[63:56];
        6: segout = q[55:48];
        5: segout = q[47:40];
        4: segout = q[39:32];
        3: segout = q[31:24];
        2: segout = q[23:16];
        1: segout = q[15:8];
        0: segout = q[7:0];
        default: segout = 8'hff;
    endcase
end
/*
// Scan & Display 7-SEG
always @(posedge cnt_scan[15])
    scanout7SEG <= scanout7SEG + 1;

always @(scanout7SEG)
begin
    case (scanout7SEG)
        0: sel = 4'hf;
        1: sel = s0;
        2: sel = s1;
        3: sel = 4'hf;
        4: sel = s2;
        5: sel = s3;
        6: sel = 4'hf;
        7: sel = s4;
        default: sel = 4'hd;
    endcase
end
always @(sel)
begin
    case (sel)
        4'h0:segout7SEG <= 8'd192; //0
        4'h1:segout7SEG <= 8'b11111001; //1
        4'h2:segout7SEG <= 8'b10100100; //2
        4'h3:segout7SEG <= 8'b10110000; //3
        4'h4:segout7SEG <= 8'b10011001; //4
        4'h5:segout7SEG <= 8'b10010010; //5
        4'h6:segout7SEG <= 8'b10000010; //6
        4'h7:segout7SEG <= 8'b11111000; //7
        4'h8:segout7SEG <= 8'b10000000; //8
        4'h9:segout7SEG <= 8'b10011000; //9
    default:
        segout <= 8'b10111111;
   endcase
end
*/
endmodule