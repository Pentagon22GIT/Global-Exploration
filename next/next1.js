$('#box1').on('inview', function (event, isInView) {
    if (isInView) {
        //要素が見えたときに実行する処理
        $("#box1 .count-up").each(function () {
            $(this).prop('Counter', 0).animate({//カウントアップ
                Counter: $(this).text()
            }, {
                // スピードやアニメーションの設定
                duration: 4000,//数字が大きいほど変化のスピードが遅くなる。2000=2秒
                easing: 'swing',//動きの種類。他にもlinearなど設定可能
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
});

$('#box3').on('inview', function (event, isInView) {
    if (isInView) {
        //要素が見えたときに実行する処理
        $("#box3 .count-down").each(function () {
            $(this).prop('Counter', 2400000).animate({//カウントアップ
                Counter: $(this).text()
            }, {
                // スピードやアニメーションの設定
                duration: 4000,//数字が大きいほど変化のスピードが遅くなる。2000=2秒
                easing: 'swing',//動きの種類。他にもlinearなど設定可能
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
});

//値をグラフに表示させる
Chart.plugins.register({
    afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    // 値の表示
                    ctx.fillStyle = '#000';//文字の色
                    var fontSize = 15;//フォントサイズ
                    var fontStyle = 'normal';//フォントスタイル
                    var fontFamily = 'Arial';//フォントファミリー
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    var dataString = dataset.data[index].toString();

                    // 値の位置
                    ctx.textAlign = 'center';//テキストを中央寄せ
                    ctx.textBaseline = 'middle';//テキストベースラインの位置を中央揃え

                    var padding = 5;//余白
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

                });
            }
        });
    }
});


//=========== 円グラフ ============//
$('#chart01').on('inview', function (event, isInView) {//画面上に入ったらグラフを描画
    if (isInView) {
        var ctx = document.getElementById("chart01");//グラフを描画したい場所のid
        var chart = new Chart(ctx, {
            type: 'pie',//グラフのタイプ
            data: {//グラフのデータ
                labels: ["飲料系", "冷凍系", "生もの系", "チケット系", "タバコ・酒系", "高価格物品系", "その他"],//データの名前
                datasets: [{
                    label: "自販機の意識調査",//グラフのタイトル
                    backgroundColor: ["#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "0000ff", "#b7b7b7"],//グラフの背景色
                    data: ["90", "4", "2", "1", "1", "1", "1"]//データ
                }]
            },

            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index] + "%";//%を最後につける
                        }
                    },
                },
                title: {
                    display: true,
                    fontSize: 10,
                    text: '単位：%'
                },
            }
        });

    }
});
