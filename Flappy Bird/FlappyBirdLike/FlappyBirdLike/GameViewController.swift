//
//  GameViewController.swift
//  FlappyBirdLike
//
//  Created by 김규희 on 2023/11/17.
//

import UIKit
import SpriteKit
import GameplayKit
import GameKit

class GameViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        gameCenterAuthenticate()
        
        if let view = self.view as! SKView? {
            // Load the SKScene from 'GameScene.sks'
           // if let scene = SKScene(fileNamed: "GameScene") {
                // Set the scale mode to scale to fit the window
            let scene = MenuScene(size: view.bounds.size)
            scene.scaleMode = .aspectFill
            // Present the scene
            view.presentScene(scene)
            
            
            view.ignoresSiblingOrder = true
            
            view.showsFPS = true
            view.showsNodeCount = true
            view.showsPhysics = true
        }
    }
    
    func gameCenterAuthenticate() {
        let localPlayer = GKLocalPlayer.local
        localPlayer.authenticateHandler = { ( viewController, error ) -> Void in
            if viewController != nil {
                self.present(viewController!, animated: true, completion: nil)
            } else if localPlayer.isAuthenticated {
                print("loggeed in to Game Center")
            } else {
                
            }
        }
    }

    override var shouldAutorotate: Bool {
        return true
    }
    
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        if UIDevice.current.userInterfaceIdiom == .phone {
            return .allButUpsideDown
        } else {
            return .all
        }
    }

    override var prefersStatusBarHidden: Bool {
        return true
    }
    
}
