document.addEventListener('DOMContentLoaded', function () {
    const contractContent = document.getElementById('contractContent');
    const tooltip = document.getElementById('tooltip');
    tooltip.className = 'tooltip-box';
    document.body.appendChild(tooltip);
    const keyValueDictElement = document.getElementById('dict');

    if (keyValueDictElement) {
        // 將字符串轉換為字典
        const keyValueStr = keyValueDictElement.textContent.trim();
        const keyValuePairs = keyValueStr.split(',').map(pair => pair.split(':').map(item => item.trim()));
        const keyValueDict = Object.fromEntries(keyValuePairs);

        console.log("Key-Value Dictionary:", keyValueDict); // 調試信息

        let htmlContent = contractContent.innerHTML;

        Object.keys(keyValueDict).forEach(key => {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 轉義正則表達式中的特殊字符
            const regex = new RegExp(escapedKey, 'g');
            const value = keyValueDict[key];
            console.log("Replacing:", key, "with:", value); // 調試信息
            htmlContent = htmlContent.replace(regex, `<span class="highlight" data-value="${value}">${key}</span>`);
        });

        contractContent.innerHTML = htmlContent;

        // 添加事件監聽器
        const highlights = document.querySelectorAll('.highlight');

        highlights.forEach(span => {
            span.addEventListener('mouseenter', function (event) {
                tooltip.innerText = span.getAttribute('data-value');
                tooltip.style.display = 'block';
                updateTooltipPosition(event);
            });

            span.addEventListener('mousemove', function (event) {
                updateTooltipPosition(event);
            });

            span.addEventListener('mouseleave', function () {
                tooltip.style.display = 'none';
            });
        });

        function updateTooltipPosition(event) {
            var mousex = event.pageX + 15; // 橫向位置
            var mousey = event.pageY + 25; // 縱向位置
            var tipWidth = tooltip.offsetWidth; // 取得提示框寬度
            var tipHeight = tooltip.offsetHeight; // 取得提示框高度
            var pageWidth = window.innerWidth; // 視窗寬度
            var pageHeight = window.innerHeight; // 視窗高度
            var scrollLeft = window.pageXOffset; // 橫向滾動位置
            var scrollTop = window.pageYOffset; // 縱向滾動位置

            // 檢查是否超出右邊界
            if ((mousex + tipWidth) > (pageWidth + scrollLeft)) {
                mousex = pageWidth + scrollLeft - tipWidth - 20; // 調整位置，避免超出右邊界
            }

            // 檢查是否超出底部邊界
            if ((mousey + tipHeight) > (pageHeight + scrollTop)) {
                mousey = event.pageY - tipHeight - 15; // 調整位置，避免超出底部邊界
            }

            // 更新提示框位置
            tooltip.style.left = mousex + 'px';
            tooltip.style.top = mousey + 'px';
        }
    } else {
        console.error('Key-Value Dictionary element not found');
    }
});



    // // 創建 tooltip 元素
    // const tooltip = document.createElement('div');
    // tooltip.className = 'tooltiptext';
    // tooltip.innerHTML = hiddenValue;
    // document.body.appendChild(tooltip);

    // contractContent.addEventListener('mouseover', function(event) {
    //     const target = event.target;
    //     if (target && target.innerText.includes(hiddenKey)) {
    //     const rect = target.getBoundingClientRect();
    //     tooltip.style.left = rect.left + window.scrollX + 'px';
    //     tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight + 'px';
    //     tooltip.style.visibility = 'visible';
    //     tooltip.style.opacity = '1';
    //     }
    // });

    // contractContent.addEventListener('mouseout', function() {
    //     tooltip.style.visibility = 'hidden';
    //     tooltip.style.opacity = '0';
    // });
// });

// $(document).ready(function(){
//     $('.tooltip').hover(function(){
//         var title = $(this).attr('title');
//         $(this).data('tipText', title).removeAttr('title');
//         $('<p class="tooltip-box"></p>')
//             .text(title)
//             .appendTo('body')
//             .fadeIn('slow');
//     }, function() {
//         $(this).attr('title', $(this).data('tipText'));
//         $('.tooltip-box').remove();
//     }).mousemove(function(e) {
//         var mousex = e.pageX + 20; // 橫向位置
//         var mousey = e.pageY + 10; // 縱向位置
//         var tipWidth = $('.tooltip-box').outerWidth(); // 取得提示框寬度
//         var tipHeight = $('.tooltip-box').outerHeight(); // 取得提示框高度
//         var pageWidth = $(window).width(); // 視窗寬度
//         var pageHeight = $(window).height(); // 視窗高度
//         var scrollLeft = $(window).scrollLeft(); // 橫向滾動位置
//         var scrollTop = $(window).scrollTop(); // 縱向滾動位置

//         // 檢查是否超出右邊界
//         if (mousex + tipWidth > pageWidth + scrollLeft) {
//             mousex = pageWidth + scrollLeft - tipWidth - 20; // 調整位置，避免超出右邊界
//         }

//         // 檢查是否超出底部邊界
//         if (mousey + tipHeight > pageHeight + scrollTop) {
//             mousey = mousey - tipHeight - 20; // 調整位置，避免超出底部邊界
//         }

//         // 更新提示框位置
//         $('.tooltip-box').css({ top: mousey, left: mousex });
//     });
// });