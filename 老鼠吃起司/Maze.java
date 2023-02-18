import java.security.SecureRandom;

public class Maze{
	private SecureRandom r = new SecureRandom();
	private char[][] maze = new char[50][50];
	private int[][] used = new int[50][50];
	private int[] dx = {0, 0, 1, -1};
	private int[] dy = {1, -1, 0, 0};
	private int startX, startY, endX, endY;
	private int n, m, wMaze, hMaze;

	public Maze(){
	}
	
	public Maze(int height, int width, int startX, int startY, int endX, int endY){
		for(int i = 0; i < 50; i++){
			for(int j = 0; j < 50; j++)
				maze[i][j] = '#';
		}
		height = (height - 1) / 2;
		width = (width - 1) / 2;
		setMaze(height, width);
		randomMaze(height/2, width/2, -1, -1);
		setStartPoint(startX, startY);
		setEndPoint(endX, endY);
	}
	
	public void setMaze(int height, int width){
		n = height;
		m = width;
		hMaze = 2*height+1;
		wMaze = 2*width+1;
	}
	
	public void setStartPoint(int startX, int startY){
		this.startX = startX;
		this.startY = startY;
		maze[startX][startY] = ' ';
	}
	
	public void setEndPoint(int endX, int endY){
		this.endX = endX;
		this.endY = endY;
		maze[endX][endY] = ' ';
	}
	
	public int getStartX(){
		return startX;
	}
	
	public int getStartY(){
		return startY;
	}
	
	public int getEndX(){
		return endX;
	}
	
	public int getEndY(){
		return endY;
	}
	
	public int getWMaze(){
		return wMaze;
	}
	
	public int getHMaze(){
		return hMaze;
	}

	public void randomMaze(int x, int y, int px, int py){
		if (x < 0 || y < 0 || x >= n || y >= m)
			return;
		if (used[x][y] == 1)
			return;
		used[x][y] = 1;
		if(px >= 0)
			maze[((x * 2 + 1) + (px * 2 + 1)) / 2][((y * 2 + 1) + (py * 2 + 1)) / 2] = ' ';
		
		maze[x * 2 + 1][y * 2 + 1] = ' ';
		int count = 0, dir = 0;
		while (count < 20) {
			dir = r.nextInt(4);
			randomMaze(x + dx[dir], y + dy[dir], x, y);
			count++;
		}
	}
	
	public char[][] getMaze(){
		return maze;
	}
}