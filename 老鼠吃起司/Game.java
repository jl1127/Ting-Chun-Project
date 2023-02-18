import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.util.Duration;

public class Game {
	private Maze maze = new Maze();
	private Player player = new Player();
	private Monster monster = new Monster();
	private int time = 60;//第一關設定:60秒
	//private Timeline timer = new Timeline(new KeyFrame(Duration.millis(1000), e -> monster.goChase()));
	private int level = 1;
	
	public Game(){
	}
	
	public Game(Maze maze, Player player, Monster monster){
		setMaze(maze);
		setPlayer(player);
		setMonster(monster);
	}
	
	public void setMaze(Maze maze){
		this.maze = maze;
		player.setMaze(maze);
		monster.setMaze(maze);
	}
	
	public void setPlayer(Player player){
		this.player = player;
	}
	
	public void setMonster(Monster monster){
		this.monster = monster;
	}
	
	public void setTime(int time){
		this.time = time;
	}
	
	public int getTime(){
		return time;
	}
	
	public Maze getMaze(){
		return maze;
	}
	public Monster getMonster(){
		return monster;
	}
}
