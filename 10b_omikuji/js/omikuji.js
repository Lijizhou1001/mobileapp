"use strict";

// サウンドフラグの初期化
let soundEndflag = "0";
let w_sound;
let music;

window.addEventListener("DOMContentLoaded", function () {
    // ヘッダーアニメーション（textillate + animate.css）
    $("header").textillate({
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 2000,
        autoStart: true,
        in: {
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: true
        }
    });

    // おみくじボタンのフェードイン表示（ScrollReveal）
    ScrollReveal().reveal("#btn1", { duration: 9000 });

    // 5秒後にポップアップメッセージ
    setTimeout(function () {
        let popMessage = "いらっしゃい！おみくじ引いてって！";
        window.alert(popMessage);
    }, 5000);
}, false);

// おみくじボタンの処理
const btn1 = document.getElementById("btn1");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");

btn1.addEventListener("click", function () {
    // 既に音が再生されているなら止める
    if (soundEndflag === "1") {
        soundControl("end", "");
    }

    // おみくじの結果データ
    const resultText = [
        "img/daikichi.png",
        "img/chukichi.png",
        "img/syokichi.png",
        "img/suekichi.png",
        "img/daikyo.png"
    ];
    const resultMaxSpeed = [10, 10, 8, 5, 5];
    const resultMaxSize = [30, 30, 30, 40, 30];
    const resultImage = [
        "img/star.png",
        "img/sakura_hanabira.png",
        "img/water1.png",
        "img/redLeaves4.png",
        "img/snowflakes.png"
    ];
    const resultSound = [
        "sound/omikuji_sound1.mp3",
        "sound/omikuji_sound2.mp3",
        "sound/omikuji_sound3.mp3",
        "sound/omikuji_sound4.mp3",
        "sound/omikuji_sound5.mp3"
    ];

    // ランダムに結果を決定
    const n = Math.floor(Math.random() * resultText.length);

    // 結果表示
    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");

    omikujiTextImage.addEventListener("animationend",
    function(){
        omikujiTextImage.classList.remove("omikujiPaper");
    },false
    );

    // 音声再生
    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndflag = "1";

    // エフェクト初期化と新たに開始
    $(document).snowfall("clear");
    $(document).snowfall({
        maxSpeed: resultMaxSpeed[n],
        minSpeed: 1,
        maxSize: resultMaxSize[n],
        minSize: 1,
        image: resultImage[n]
    });
}, false);

// 音声コントロール関数
function soundControl(status, w_sound) {
    if (status === "start") {
        music = new Audio(w_sound);
        music.currentTime = 0;
        music.play();
    } else if (status === "end") {
        if (music) {
            music.pause();
            music.currentTime = 0;
        }
    }
}
