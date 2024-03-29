function MapSelect () {
    myMenu2 = miniMenu.createMenu(
    miniMenu.createMenuItem("Map1"),
    miniMenu.createMenuItem("Map2"),
    miniMenu.createMenuItem("Map3")
    )
    myMenu2.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 50)
    myMenu2.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 100)
    // Code provided by Mini Menu Extension
    myMenu2.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
    4,
    0,
    0,
    0
    ))
    myMenu2.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Margin, miniMenu.createBorderBox(
    0,
    0,
    0,
    2
    ))
    myMenu2.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.BorderColor, 11)
    myMenu2.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 4)
    myMenu2.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 12)
    myMenu2.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 11)
    myMenu2.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 4)
    myMenu2.top = 10
    myMenu2.bottom = 150
    myMenu2.onButtonPressed(controller.A, function (selection, selectedIndex) {
        myMenu2.close()
        if (selectedIndex == 0) {
            Map1()
            Map1Spawn()
            Movement()
            SpawnPowerUp(randint(1, EnemyImg.length))
        } else if (selectedIndex == 1) {
            Map2()
            Map2Spawn()
            Movement()
            SpawnPowerUp(randint(1, EnemyImg.length))
        } else if (selectedIndex == 2) {
            Map3()
            Map3Spawn()
            Movement()
            SpawnPowerUp(randint(1, EnemyImg.length))
        }
    })
}
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile3, function (sprite, location) {
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, sprite)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, sprite)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera3, sprite)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera4, sprite)
    list.unshift(sprite)
    WinScreen()
})
function Movement () {
    controller.player1.moveSprite(p1)
    controller.player2.moveSprite(p2)
    controller.player3.moveSprite(p3)
    controller.player4.moveSprite(p4)
}
function Map2Spawn () {
    tiles.placeOnTile(p1, tiles.getTileLocation(16, 54))
    tiles.placeOnTile(p2, tiles.getTileLocation(17, 54))
    tiles.placeOnTile(p3, tiles.getTileLocation(18, 54))
    tiles.placeOnTile(p4, tiles.getTileLocation(19, 54))
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Left)) {
        sprite.vx += 50
    } else if (sprite.isHittingTile(CollisionDirection.Right)) {
        sprite.vx += -50
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    sprite.ay += -30
})
function Map2 () {
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, p1)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, p2)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera3, p3)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera4, p4)
    tiles.setCurrentTilemap(tilemap`level0`)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, sprites.skillmap.islandTile4)
})
function Map3Spawn () {
    tiles.placeOnTile(p1, tiles.getTileLocation(28, 3))
    tiles.placeOnTile(p2, tiles.getTileLocation(29, 3))
    tiles.placeOnTile(p3, tiles.getTileLocation(30, 3))
    tiles.placeOnTile(p4, tiles.getTileLocation(31, 3))
}
function Map3 () {
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, p1)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, p2)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera3, p3)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera4, p4)
    tiles.setCurrentTilemap(tilemap`level3`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.y += 5
    sprite.x += randint(-5, 5)
    otherSprite.y += 5
    otherSprite.x += randint(-5, 5)
})
function Map1 () {
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, p1)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, p2)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera3, p3)
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera4, p4)
    tiles.setCurrentTilemap(tilemap`level`)
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Left)) {
        sprite.vx += 100
    } else if (sprite.isHittingTile(CollisionDirection.Right)) {
        sprite.vx += -100
    }
})
function Map1Spawn () {
    tiles.placeOnTile(p1, tiles.getTileLocation(16, 54))
    tiles.placeOnTile(p2, tiles.getTileLocation(17, 54))
    tiles.placeOnTile(p3, tiles.getTileLocation(18, 54))
    tiles.placeOnTile(p4, tiles.getTileLocation(19, 54))
}
function WinScreen () {
    tiles.setCurrentTilemap(tilemap`level2`)
    scene.setBackgroundColor(8)
    tiles.placeOnTile(list[0], tiles.getTileLocation(7, 4))
    list[0].startEffect(effects.confetti, 500)
    effects.confetti.endScreenEffect()
}
// Sample code provided by teacher
function SpawnPowerUp (num: number) {
    if (num < EnemyImg.length) {
        for (let index = 0; index < num; index++) {
            PULocation = tiles.getTilesByType(sprites.swamp.swampTile9)
            PowerUp = sprites.create(EnemyImg._pickRandom(), SpriteKind.Enemy)
            tiles.placeOnRandomTile(PowerUp, sprites.swamp.swampTile9)
            PowerUp.vx = 20
        }
    } else if (num == EnemyImg.length) {
        PULocation = tiles.getTilesByType(sprites.swamp.swampTile9)
        Special = sprites.create(img`
            . . . . . . . b b . . . . . . . 
            . . . . . . b d d b . . . . . . 
            . . . . . b d 5 5 d b . . . . . 
            . . . . b b 5 5 5 5 b b . . . . 
            . . . . b 5 5 5 5 5 5 b . . . . 
            b b b b b 5 5 5 5 1 1 d b b b b 
            b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
            b d d 5 5 5 5 5 5 1 1 1 5 d d b 
            . b d d 5 5 5 5 5 5 5 5 d d b . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . c b 5 5 5 5 5 5 5 5 b c . . 
            . . c 5 5 5 5 d d 5 5 5 5 c . . 
            . . c 5 5 d b b b b d 5 5 c . . 
            . . c 5 d b c c c c b d 5 c . . 
            . . c c c c . . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        tiles.placeOnRandomTile(Special, sprites.swamp.swampTile9)
        Special.vx = 50
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprite.ay += -10
})
let Special: Sprite = null
let PowerUp: Sprite = null
let PULocation: tiles.Location[] = []
let list: Sprite[] = []
let myMenu2: miniMenu.MenuSprite = null
let EnemyImg: Image[] = []
let p4: Sprite = null
let p3: Sprite = null
let p2: Sprite = null
let p1: Sprite = null
scene.setBackgroundColor(11)
// Code provided by Mini Menu Extension
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("Choose Map")
)
myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    myMenu.close()
    p1 = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    p2 = sprites.create(img`
        . . . . . f f 4 4 f f . . . . . 
        . . . . f 5 4 5 5 4 5 f . . . . 
        . . . f e 3 3 3 3 3 3 e f . . . 
        . . f b 3 3 3 3 3 3 3 3 b f . . 
        . . f 3 3 3 3 3 3 3 3 3 3 f . . 
        . f 3 3 3 3 3 3 3 3 3 3 3 3 f . 
        . f b 3 3 3 3 3 3 3 3 3 3 b f . 
        . f b b 3 3 3 3 3 3 3 3 b b f . 
        . f b b b b b b b b b b b b f . 
        f c b b b b b b b b b b b b c f 
        f b b b b b b b b b b b b b b f 
        . f c c b b b b b b b b c c f . 
        . . e 4 c f f f f f f c 4 e . . 
        . . e f b d b d b d b b f e . . 
        . . . f f 1 d 1 d 1 d f f . . . 
        . . . . . f f b b f f . . . . . 
        `, SpriteKind.Player)
    p3 = sprites.create(img`
        . . . . f f f f . . . . . 
        . . f f c c c c f f . . . 
        . f f c c c c c c f f . . 
        f f c c c c c c c c f f . 
        f f c c f c c c c c c f . 
        f f f f f c c c f c c f . 
        f f f f c c c f c c f f . 
        f f f f f f f f f f f f . 
        f f f f f f f f f f f f . 
        . f f f f f f f f f f . . 
        . f f f f f f f f f f . . 
        f e f f f f f f f f e f . 
        e 4 f 7 7 7 7 7 7 c 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, SpriteKind.Player)
    p4 = sprites.create(img`
        . . . . f f f f . . . . 
        . . f f e e e e f f . . 
        . f e e e e e e e f f . 
        f f e f e e e e e e f f 
        f f f e e e e e e e e f 
        f f f e e e e e e f e f 
        f f f f e e e e f f f f 
        f f f f f f f f f f f f 
        f f f f f f f f f f f f 
        . f f f f f f f f f f . 
        . e f f f f f f f f e . 
        e 4 f b b b b b b f 4 e 
        4 d f d d d d d d c d 4 
        4 4 f 6 6 6 6 6 6 f 4 4 
        . . . f f f f f f . . . 
        . . . f f . . f f . . . 
        `, SpriteKind.Player)
    p1.x = 100
    p2.x = 200
    p3.x = 300
    p4.x = 600
    if (selectedIndex == 0) {
        MapSelect()
    }
})
EnemyImg = [
img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `,
img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `,
img`
    . . . . . 3 3 b 3 3 d d 3 3 . . 
    . . . . 3 1 1 d 3 d 1 1 1 1 3 . 
    . . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
    . . 3 d d 1 1 1 d d 1 1 1 3 3 3 
    . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
    . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
    . b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
    . 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
    . 4 4 d 1 1 1 1 1 1 d d d b b . 
    . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
    4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
    4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
    4 5 5 d 5 5 d b b b d d 3 . . . 
    4 5 5 5 d d d d 4 4 b 3 . . . . 
    . 4 5 5 5 4 4 4 . . . . . . . . 
    . . 4 4 4 . . . . . . . . . . . 
    `,
img`
    . . . . c c c b b b b b . . . . 
    . . c c b 4 4 4 4 4 4 b b b . . 
    . c c 4 4 4 4 4 5 4 4 4 4 b c . 
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
    . e b 4 4 4 4 4 5 4 4 4 4 b e . 
    8 7 e e b 4 4 4 4 4 4 b e e 6 8 
    8 7 2 e e e e e e e e e e 2 7 8 
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
    e b e 8 8 c c 8 8 c c c 8 e b e 
    e e b e c c e e e e e c e b e e 
    . e e b b 4 4 4 4 4 4 4 4 e e . 
    . . . c c c c c e e e e e . . . 
    `
]
