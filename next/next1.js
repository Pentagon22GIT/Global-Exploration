$('#box1').on('inview', function (event, isInView) {
    if (isInView) {
        $("#box1 .count-up").each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
});

$('#box3').on('inview', function (event, isInView) {
    if (isInView) {
        $("#box3 .count-down").each(function () {
            $(this).prop('Counter', 2400000).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
});

Chart.plugins.register({
    afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                    ctx.fillStyle = '#000';
                    var fontSize = 15;
                    var fontStyle = 'normal';
                    var fontFamily = 'Arial';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    var dataString = dataset.data[index].toString();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

                });
            }
        });
    }
});


//=========== 円グラフ ============//
$('#chart01').on('inview', function (event, isInView) {
    if (isInView) {
        var ctx = document.getElementById("chart01");
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["飲料系", "冷凍系", "生もの系", "チケット系", "タバコ・酒系", "高価格物品系", "その他"],
                datasets: [{
                    label: "自販機の意識調査",
                    backgroundColor: ["#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "0000ff", "#b7b7b7"],
                    data: ["90", "4", "2", "1", "1", "1", "1"]
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
