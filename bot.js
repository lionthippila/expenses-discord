function sendMessage() {
    var content = document.getElementById("content").value;
    var amount = document.getElementById("amount").value;
    var imageInput = document.getElementById("fileInput");
    var imageFile = imageInput.files[0];

    // Get current date
    var currentDate = new Date();

    // Format date as 'dd Month yyyy'
    var formattedDate = currentDate.getDate() + ' ' + getMonthName(currentDate.getMonth()) + ' ' + currentDate.getFullYear();

    // Append formatted date and amount to the message content  // แก้ไขบรรทัดนี้
    content = '[' + formattedDate + '] ' + content + ' - Amount: ' + amount +' บาท ';

    var formData = new FormData();
    formData.append("content", content);
    formData.append("file", imageFile);

    var request = new XMLHttpRequest();
    var webhookURL = "https://discord.com/api/webhooks/1259048528328785930/VQRQfpW-K4-g_jjCpt7nhDcygLL1NeWSmQ_x_RsPQSlyXXU47OV-dN-QJ-K_h3ulbKve";
    request.open("POST", webhookURL);
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log("Message sent successfully!");
            } else {
                console.error("Failed to send message:", request.status, request.statusText);
            }
        }
    };

    request.send(formData);
}


function getMonthName(monthIndex) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                      'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthIndex];
}

function previewImage(event) {
    var input = event.target;
    var preview = document.getElementById('previewImage');

    var reader = new FileReader();
    reader.onload = function() {
        preview.src = reader.result;
        preview.style.display = 'block';
    };

    reader.readAsDataURL(input.files[0]);
}
