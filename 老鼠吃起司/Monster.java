import java.util.ArrayList;

public class Monster{
	private boolean close = false;
	private boolean capture = false;
	private boolean judgeWall = false;
	private int x, y, px, py, xPrey, yPrey, dir, dir2, move, guide = -1, preGuide = -1, cPath;
	private char[][] maze = new char[50][50];
	private ArrayList<Integer> al_path = new ArrayList<Integer>();

	public Monster(){
	}
	
	public Monster(int x, int y, Maze maze){
		setPoint(x, y);
		setMaze(maze);
	}
	
	public void setMaze(Maze maze){
		this.maze = maze.getMaze();
	}
	
	public void setPoint(int x, int y){
		this.x = x;
		this.y = y;
		maze[x][y] = '@';
	}
	
	public void setPreyPoint(int x, int y){
		xPrey = x;
		yPrey = y;
	}

	public int getX(){
		return x;
	}
	
	public int getY(){
		return y;
	}
	
	public void setMonsterAI(){//會變動 AI class??
		
	}
	
	public boolean isCapture(){
		return capture;
	}
	
	public boolean isClose(){
		return close;
	}

	public void goChase(int xPrey, int yPrey){
		setPreyPoint(xPrey, yPrey);
		if((x < xPrey && y < yPrey) || (y == yPrey && x < xPrey) || (x == xPrey && y < yPrey)){ //左上到右下  || 上到下 || 左到右  上1下2左3右4
			dir = 2;
			dir2 = 4;
		}
		else if((x < xPrey && y > yPrey) || (x == xPrey && y > yPrey)){ //右上到左下 || 右到左
			dir = 2;
			dir2 = 3;
		}
		else if((x > xPrey && y < yPrey) || (y == yPrey && x > xPrey)){ //左下到右上 || 下到上
			dir = 1;
			dir2 = 4;
		}
		else if(x > xPrey && y > yPrey){ //右下到左上
			dir = 1;
			dir2 = 3;
		}
		move = 0;
		closeToPrey();

		if(dir == 1 && x-1 >= 0){				//up
			if(maze[x-1][y] != '#' && maze[x-1][y] != '@' && maze[x-1][y] != '*'){
				maze[--x][y] = '@';
				al_path.add(1);
				move++;
			}
			else if(x+1 <= maze.length - 1){			//down
				if(maze[x+1][y] != '#' && maze[x+1][y] != '@' && maze[x+1][y] != '*'){
					maze[++x][y] = '@';
					al_path.add(2);
					move++;
				}			
			}
		}
		else if(dir == 2 && x+1 <= maze.length - 1){			//down
			if(maze[x+1][y] != '#' && maze[x+1][y] != '@' && maze[x+1][y] != '*'){
				maze[++x][y] = '@';
				al_path.add(2);
				move++;
			}
			else if(x-1 >= 0){									//up
				if(maze[x-1][y] != '#' && maze[x-1][y] != '@' && maze[x-1][y] != '*'){
					maze[--x][y] = '@';
					al_path.add(1);
					move++;
				}
			}
		}
		if(dir2 == 3 && y-1 >= 0){				//left
			if(maze[x][y-1] != '#' && maze[x][y-1] != '@' && maze[x][y-1] != '*'){
				maze[x][--y] = '@';
				al_path.add(3);
				move++;
			}
			else if(y+1 <= maze[0].length - 1){			//right
				if(maze[x][y+1] != '#' && maze[x][y+1] != '@' && maze[x][y+1] != '*'){
					maze[x][++y] = '@';
					al_path.add(4);
					move++;
				}			
			}
		}
		else if(dir2 == 4 && y+1 <= maze[0].length - 1){			//right
			if(maze[x][y+1] != '#' && maze[x][y+1] != '@' && maze[x][y+1] != '*'){
				maze[x][++y] = '@';
				al_path.add(4);
				move++;
			}
			else if(y-1 >= 0){			//left
				if(maze[x][y-1] != '#' && maze[x][y-1] != '@' && maze[x][y-1] != '*'){
					maze[x][--y] = '@';
					al_path.add(3);
					move++;
				}		
			}
		}
		if(move == 0){
			if(al_path.get(al_path.size()-1) == 1){
				maze[x++][y] = '*';
			}
			else if(al_path.get(al_path.size()-1) == 2){
				maze[x--][y] = '*';
			}
			else if(al_path.get(al_path.size()-1) == 3){
				maze[x][y++] = '*';
			}
			else if(al_path.get(al_path.size()-1) == 4){
				maze[x][y--] = '*';
			}
			al_path.remove(al_path.size()-1);
		}
	}
	
	void closeToPrey(){
		judgeWall = false;
		close = false;
		if(y == yPrey && x > xPrey && x - 7 <= xPrey){		//up
			for (int j = x; j != xPrey;) {
				if (maze[--j][yPrey] == '#')
					judgeWall = true;
			}
			if(judgeWall)
				return;
			close = true;
			dir = 1;
			dir2 = 0;
		}
		if(y == yPrey && x < xPrey && x + 7 >= xPrey){		//down
			for (int j = x; j != xPrey;) {
				if (maze[++j][yPrey] == '#')
					judgeWall = true;
			}
			if(judgeWall)
				return;
			close = true;
			dir = 2;
			dir2 = 0;
		}
		if(x == xPrey && y > yPrey && y - 7 <= yPrey){		//left
			for (int j = y; j != yPrey;) {
				if (maze[xPrey][--j] == '#')
					judgeWall = true;
			}
			if(judgeWall)
				return;
			close = true;
			dir = 0;
			dir2 = 3;
		}
		if(x == xPrey && y < yPrey && y + 7 >= yPrey){		//right
			for (int j = y; j != yPrey;) {
				if (maze[xPrey][++j] == '#')
					judgeWall = true;
			}
			if(judgeWall)
				return;
			close = true;
			dir = 0;
			dir2 = 4;
		}
			
	}
}