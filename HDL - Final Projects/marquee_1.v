module marquee_1 (clk, clk20, reset, left, right, fire, segout, scanout);
 
input clk, clk20, reset, left, right, fire;
output reg [7:0] segout;
output reg [2:0] scanout;
 
reg [25:0] cnt_scan;
reg [15:0] cnt_clk2;
 
reg [2:0] x=3, y=6;
reg [2:0] bulletX, bulletY;
reg [2:0] ufoX[4], ufoY[4];
reg [3:0] ufoLifeCnt[4];
 
reg clk1;
reg [63:0] q;
reg [2:0] i,j;
reg [1:0] level;
reg [7:0] score;
reg [2:0] k;

reg [7:0] bullet;
reg [2:0] b;
reg [1:0] mode = 0;
// Clock Runing
 
always @(posedge clk)
begin
   cnt_scan <= cnt_scan + 1;
   if (cnt_scan == 06250000) begin
       cnt_scan <= 0;
       clk1 = ~clk1;
   end
end
always @(posedge clk20)
begin
   cnt_clk2 <= cnt_clk2 + 1;
end
// Modify Display digit
always @(posedge clk1, negedge reset)
begin
   if(reset == 0) begin
       for (i = 0; i < 4; i = i + 1) begin
           ufoX[i] = 0;
           ufoY[i] = 0;
           ufoLifeCnt[i] = 0;
           score = 8'hff;
           bullet = 8'h00;
       end
 
       i = 0;
       level = 2;
       k = -1;
       b = 8;
       x = 3;
       y = 6;
       bulletX = 0;
       bulletY = 6;
       q = 64'hffff_ffff_ffff_ffff;
       q[x + 8*y] = 1'b0;
       q[x - 1 + 8*y] = 1'b0;
       q[x + 1 + 8*y] = 1'b0;
       q[x + 8*(y - 1)] = 1'b0;
   end
   else begin
        if (mode == 0)begin
            if (i <= level) begin
                if (ufoX[i] == 0 && ufoY[i] == 0)begin
                    ufoX[i] = cnt_clk2[14:12];
                    ufoY[i] = cnt_clk2[12:11];
                    ufoLifeCnt[j] = cnt_clk2[11:9];
                end
                i = i + 1;
            end
            else
                for (j = 0 ; j <= level ; j = j + 1) begin
                    ufoLifeCnt[j] = ufoLifeCnt[j] - 1;
                    if (ufoLifeCnt[j] == 0)begin
                        ufoX[j] = cnt_clk2[14:12] + j;
                        ufoY[j] = cnt_clk2[12:11];
                        ufoLifeCnt[j] = cnt_clk2[11:9] + j;
                    end
            end
            // Collision detect
            for (j = 0 ; j <= level ; j = j + 1)
                if (ufoX[j] == bulletX && ufoY[j] == bulletY) begin
                    ufoX[j] = 0;
                    ufoY[j] = 0;
                    ufoLifeCnt[j] = 0;
                    bulletX = 0;
                    bulletY = 6;
                    k = k + 1;
                    //score[k] = 1'b0;
                end
        // Display UFO
            q = q | 64'hff00_00ff_ffff_ffff;// | (or)
            for (j = 0; j <= level; j = j + 1)
                q[ufoX[j] + 8*ufoY[j]] = 1'b0;
        // Display score at bottom
                //q[63:56] = score;
            if (bulletY < 6) begin
                q[bulletX + 8*bulletY] = 1'b0;
                q[x + 8*y] = 1'b0;
                bulletY = bulletY - 1;
            end
            if (left == 0) begin
                q = q | 64'h00ff_ff00_0000_0000;
                x = x - 1;
                q[x + 8*y] = 1'b0;
                if (x == 0)
                    q[7 + 8*y] = 1'b0;
                else
                    q[x - 1 + 8*y] = 1'b0;
                if (x == 7)
                    q[8*y] = 1'b0;
                else
                    q[x + 1 + 8*y] = 1'b0;
                q[x + 8*(y-1)] = 1'b0;
            end
            else if (right == 0) begin
                q = q | 64'h00ff_ff00_0000_0000;
                x = x + 1;
                q[x + 8*y] = 1'b0;
                if (x == 0)
                    q[-1 + 8*y] = 1'b0;
                else
                    q[x -1 + 8*y] = 1'b0;
                if (x == 7)
                    q[8*y] = 1'b0;
                else
                    q[x + 1 + 8*y] = 1'b0;
                q[x + 8*(y - 1)] = 1'b0;
            end
            if (fire == 0) begin
                bulletX = x;
                bulletY = y - 2;
                b = b - 1;
                bullet[b] = 1'b1;
            end
            q[63:56] = bullet; // Display bullet at bottom
            if (k == 1)begin
                mode = 1;
            end
            else if (b == 0)begin
                mode = 2;
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
// Scan & Display 7-SEG
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


