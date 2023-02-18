module main (clk, reset, left, right, fire, segout, scanout);
input clk, reset, left, right, fire;
output reg[7:0] segout;
output reg[2:0] scanout;

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
endmodule
