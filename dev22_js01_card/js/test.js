// グローバル
// div要素を格納
var cards = [];
// 開始時間
var startTime;
// 経過秒数用 タイマーID
var timer;
// カードめくり用 タイマーID
var backTimer;
// 1枚目かどうかのフラグ   1枚目: true   2枚目: false
var flgFirst = true;
// 1枚目のカードを格納
var cardFirst;
// そろえた枚数
var countUnit = 0;


//var deck = [];//カードデッキ
//var pairs = [
    ["../img__card/c_2", "../img__card/d_2","../img__card/h_2", "../img__card/s_2"],
    ["../img__card/c_3", "../img__card/d_3","../img__card/h_3", "../img__card/s_3"],
    ["../img__card/c_4", "../img__card/d_4","../img__card/h_4", "../img__card/s_4"],
    ["../img__card/c_5", "../img__card/d_5","../img__card/h_5", "../img__card/s_5"],
    ["../img__card/c_6", "../img__card/d_6","../img__card/h_6", "../img__card/s_6"],
    ["../img__card/c_7", "../img__card/d_7","../img__card/h_7", "../img__card/s_7"],
    ["../img__card/c_8", "../img__card/d_8","../img__card/h_8", "../img__card/s_8"],
    ["../img__card/c_9", "../img__card/d_9","../img__card/h_9", "../img__card/s_9"],
    ["../img__card/c_10", "../img__card/d_10","../img__card/h_10", "../img__card/s_10"],
    ["../img__card/c_A", "../img__card/d_A","../img__card/h_A", "../img__card/s_A"],
    ["../img__card/c_J", "../img__card/d_J","../img__card/h_J", "../img__card/s_J"],
    ["../img__card/c_Q", "../img__card/d_Q","../img__card/h_Q", "../img__card/s_Q"],
    ["../img__card/c_K", "../img__card/d_K","../img__card/h_K", "../img__card/s_K"],


window.onload = function(){
    // 数字格納 一時配列
    var arr = [];
    
    for (var i = 0; i < 13; i++){
        // 4つの数字＊13
        arr.push(i);
        arr.push(i);
        arr.push(i);
        arr.push(i);
    }
    
    // シャッフル
    shuffle(arr);
    
    var panel = document.getElementById('panel');
    
    // div要素作成
    for (i = 0; i < 52; i++){
        var div = document.createElement('div');
        div.className = 'card back';
        div.index = i;
        div.number = arr[i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }
    // 開始時刻を取得
    startTime = new Date();
    // タイマー開始
    startTimer();
    
}

// シャッフル用関数
function shuffle(arr) {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// クリック時の処理
function turn(e){
    
    var div = e.target;
    
    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 裏向きのカードをクリックした場合は数字を表示する
    if (div.innerHTML == ''){
        div.className = 'card';
        div.innerHTML = div.number; 
    }else{
        // 数字が表示されているカードは return
        return;
    }
    
    // 1枚目の処理
    if (flgFirst){
        // cardFirst は2枚目の処理のときに使う
        cardFirst = div;
        // フラグ変更
        flgFirst = false;
        
    // 2枚目の処理
    }else{
        
        // 数字が1枚目と一致する場合
        if (cardFirst.number == div.number){
            countUnit++;
            // 見えない状態にする
            backTimer = setTimeout(function(){
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
                
                if (countUnit == 26){
                    clearInterval(timer);  // timer終了
                }
            }, 500)

        // 一致しない場合
        }else{  
            // カードを裏側に戻す
            backTimer = setTimeout(function(){
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        
        flgFirst = true;
    }  
}

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// 時間表示（分・秒）
function showSecond(){

    var nowTime = new Date();
    var elapsedTimesecond = Math.floor((nowTime - startTime) / 1000);
    var str = '経過時間: ' + elapsedTimesecond + '秒';
    var re = document.getElementById('result');
    re.innerHTML = str;
}
