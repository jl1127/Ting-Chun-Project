import javafx.application.Application;
import javafx.stage.Stage;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.input.KeyCode;
import javafx.animation.Timeline;
import javafx.animation.KeyFrame;
import javafx.util.Duration;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.text.Font;
import javafx.scene.effect.DropShadow;
import javafx.scene.effect.Glow;
import javafx.scene.effect.Reflection;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.control.Button;
import javafx.scene.image.ImageView;
import javafx.scene.image.Image;

public class GameControl extends Application{
	Label l_title = new Label("逃離迷宮"), l_start = new Label("Start"), l_clock = new Label("01:00");
	TextField tf_name = new TextField();
	Pane menuPane = new Pane();
	Pane pane = new Pane();
	Scene scene;
	Parent parent;
	Game game = new Game();
	Stage stage;
	int time, startTime;
	int once = 1, one = 0;
	ImageView image = new ImageView(new Image("gameOver.png"));

	Rectangle monster = new Rectangle(), player = new Rectangle();
	Timeline mSpeed = new Timeline(new KeyFrame(Duration.millis(150), e-> {
		if(!(monster.getX() == player.getX() && monster.getY() == player.getY())){
			game.getMonster().goChase((int)player.getY()/15, (int)player.getX()/15);
			monster.setX(15*game.getMonster().getY());
			monster.setY(15*game.getMonster().getX());
			if(game.getMonster().isClose() && one==0){
				change();
				one++;
			}
		}
		else{
			pane.getChildren().clear();
			image.setFitHeight(700);
			image.setFitWidth(650);
			pane.getChildren().add(image);
		}
	}));
	Timeline timer = new Timeline(new KeyFrame(Duration.millis(1000), e -> {
		if(game.getTime() != 0){
			if(game.getTime() <= (startTime / 3) * 2){	//每關的一定時間
				if(once-- == 1){
					monster.setX(15*1);
					monster.setY(15*0);
					game.getMonster().setPoint(0,1);
					pane.getChildren().add(monster);
				}
				if(!(monster.getX() == player.getX() && monster.getY() == player.getY())){
					mSpeed.play();
				}
			}
			time = game.getTime()-1;
			game.setTime(time);
			l_clock.setText(game.getTime()/60 + ":" + game.getTime()%60);
		}
		else{
			pane.getChildren().clear();
			image.setFitHeight(700);
			image.setFitWidth(650);
			pane.getChildren().add(image);
		}
	}));
	
	public void change(){
		mSpeed.getKeyFrames().add(new KeyFrame(Duration.millis(5), e-> {
			//if(!game.getMonster().isCapture()){
			if(!(monster.getX() == player.getX() && monster.getY() == player.getY())){
				game.getMonster().goChase((int)player.getY()/15, (int)player.getX()/15);
				monster.setX(15*game.getMonster().getY());
				monster.setY(15*game.getMonster().getX());
				if(game.getMonster().isClose() && one == 0){
					change();
					//mSpeed.getKeyFrames().add(new KeyFrame(Duration.millis(5000)));
				}
			}
			else{
				pane.getChildren().clear();
				image.setFitHeight(700);
				image.setFitWidth(650);
				pane.getChildren().add(image);
			}
		}));
		mSpeed.setCycleCount(Timeline.INDEFINITE);
	}

	@Override
	public void start(Stage stage){
		startTime = game.getTime();
		l_title.setId("l_title");
		l_start.setId("l_start");
		l_clock.setId("l_clock");
		pane = new Pane();
		pane.getChildren().addAll(l_title, tf_name, l_start);
		l_title.setLayoutX(110);
		l_title.setLayoutY(62);
		l_title.setEffect(new Glow(0.82));
		
		tf_name.setPrefSize(310, 49);
		tf_name.setLayoutX(149);
		tf_name.setLayoutY(245);
		tf_name.setPromptText("請輸入暱稱");
		tf_name.setFont(new Font("請輸入暱稱", 26));
		
		l_start.setLayoutX(234);
		l_start.setLayoutY(339);
		l_start.setEffect(new Glow(0.82));
		
		scene = new Scene(pane, 600, 500);
		scene.getStylesheets().add(GameControl.class.getResource("GameView.css").toExternalForm());
		stage.setScene(scene);
		stage.setResizable(false);
		stage.centerOnScreen();
		stage.show();
		
		scene.setOnKeyPressed(e->{
			switch (e.getCode()) {
				case UP:
					if(game.getMaze().getMaze()[((int)player.getY()-15)/15][(int)player.getX()/15] != '#' && !(monster.getX() == player.getX() && monster.getY() == player.getY())){
						player.setY(player.getY()-15);
						//System.out.println(player.getY() + "," + player.getX());
						if((int)player.getY()/15 == game.getMaze().getEndX() && (int)player.getX()/15 == game.getMaze().getEndY()){
							System.out.println("win!!");
							game.setMaze(new Maze(43, 43, 0, 1, 42, 41));
							pane.getChildren().clear();
							startTime = time = game.getTime()+90;
							game.setTime(time);
							l_clock.setText(game.getTime()/60 + ":" + game.getTime()%60);
							once = 1;
							mSpeed.stop();
							gameStart();
						}
					}
					break;
				case DOWN:
					if(game.getMaze().getMaze()[((int)player.getY()+15)/15][(int)player.getX()/15] != '#' && !(monster.getX() == player.getX() && monster.getY() == player.getY())){
						player.setY(player.getY()+15);
						//System.out.println(player.getY());
						if((int)player.getY()/15 == game.getMaze().getEndX() && (int)player.getX()/15 == game.getMaze().getEndY()){
							System.out.println("win!!");
							game.setMaze(new Maze(43, 43, 0, 1, 42, 41));
							pane.getChildren().clear();
							startTime = time = game.getTime()+90;
							game.setTime(time);
							l_clock.setText(game.getTime()/60 + ":" + game.getTime()%60);
							once = 1;
							mSpeed.stop();
							gameStart();
						}
					}
					break;
				case LEFT:
					if(game.getMaze().getMaze()[(int)player.getY()/15][((int)player.getX()-15)/15] != '#' && !(monster.getX() == player.getX() && monster.getY() == player.getY())){
						player.setX(player.getX()-15);
						//System.out.println(player.getX());
						if((int)player.getY()/15 == game.getMaze().getEndX() && (int)player.getX()/15 == game.getMaze().getEndY()){
							System.out.println("win!!");
							game.setMaze(new Maze(43, 43, 0, 1, 42, 41));
							pane.getChildren().clear();
							startTime = time = game.getTime()+90;
							game.setTime(time);
							l_clock.setText(game.getTime()/60 + ":" + game.getTime()%60);
							once = 1;
							mSpeed.stop();
							gameStart();
						}
					}
					break;
				case RIGHT:
					if(game.getMaze().getMaze()[(int)player.getY()/15][((int)player.getX()+15)/15] != '#' && !(monster.getX() == player.getX() && monster.getY() == player.getY())){
						player.setX(player.getX()+15);
						//System.out.println(player.getX());
						if((int)player.getY()/15 == game.getMaze().getEndX() && (int)player.getX()/15 == game.getMaze().getEndY()){
							System.out.println("win!!");
							game.setMaze(new Maze(43, 43, 0, 1, 42, 41));
							pane.getChildren().clear();
							startTime = time = game.getTime()+90;
							game.setTime(time);
							l_clock.setText(game.getTime()/60 + ":" + game.getTime()%60);
							once = 1;
							mSpeed.stop();
							gameStart();
						}
					}
			}
		});
		
		l_start.setOnMouseClicked(e->{
			Maze maze = new Maze(43, 43, 0, 1, 42, 41);  // 起點終點被檔住怎辦?
			game = new Game(maze, new Player(tf_name.getText(), 0, 1, maze), new Monster(0, 1, maze)); //有牆怎辦  11  43
			l_title.setVisible(false);
			l_start.setVisible(false);
			tf_name.setVisible(false);
			pane.setVisible(true);
			gameStart();
			stage.setHeight(15*44.7); // 43 15*44.7
			stage.setWidth(15*43.22); // 43 15*43.22
			stage.centerOnScreen();
			timer.setCycleCount(Timeline.INDEFINITE);
			mSpeed.setCycleCount(Timeline.INDEFINITE);
			timer.play();
		});
	}
	
	public void gameStart(){
		char[][] maze = game.getMaze().getMaze();
		pane.resize(15*43, 15*43);
		for(int i = 0; i < 43; i++){
			for(int j = 0; j < 43; j++){
				if(maze[i][j] == '#')
					pane.getChildren().add(new Rectangle(15*j, 15*i, 15, 15));
			}
		}
		int startX = game.getMaze().getStartX();
		int startY = game.getMaze().getStartY();
		player = new Rectangle(15*startY, 15*startX, 15, 15);
		player.setId("player");
		player.setStroke(Color.BLACK);
		player.setStrokeWidth(0.75);
		pane.getChildren().add(player);
		
		monster = new Rectangle(0, 0, 15, 15);
		monster.setId("monster");
		monster.setStroke(Color.BLACK);
		monster.setStrokeWidth(0.75);
		
		pane.getChildren().add(l_clock);
		l_clock.setLayoutX(575);
	}

	public static void main(String args[]){
		launch(args);
	}
}