public class Player{
	private String name;
	private int flashlight;
	private int sight; //round
	private int score;
	private int lifeTime;
	private int x, y;
	private char[][] maze;
	
	public Player(){
	}
	
	public Player(String name, int x, int y, Maze maze){
		setName(name);
		setPoint(x, y);
		setMaze(maze);
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public void setPoint(int x, int y){
		this.x = x;
		this.y = y;
	}
	
	public void setMaze(Maze maze){
		this.maze = maze.getMaze();
	}
}