function searchBank(event) {
  event.preventDefault();

  var accountNumber = document.getElementById("account").value;
  var accountName = document.getElementById("name").value;
  
  // sử dụng đường dẫn tương đối
  var blacklistFile = "blacklist.json";

  fetch(blacklistFile)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var isScam = false;
      for (var i = 0; i < data.blacklist.length; i++) {
        if (data.blacklist[i].so_tai_khoan === accountNumber && data.blacklist[i].ten_tai_khoan === accountName) {
          isScam = true;
          break;
        }
      }
      showResult(isScam);
    })
    .catch(function(error) {
      console.error('Fetch error:', error);
      showError();
    });
}

function showResult(isScam) {
  var resultElement = document.getElementById("result");
  var notificationElement = document.getElementById("notification");
  
  if (isScam) {
    resultElement.style.backgroundImage = "url('./scam.jpg')";
    notificationElement.innerHTML = "Tài khoản này là tài khoản lừa đảo";
  } else {
    resultElement.style.backgroundImage = "url('./not_scam.jpg')";
    notificationElement.innerHTML = "Tài khoản này không phải là tài khoản lừa đảo";
  }
}

function showError() {
  var notificationElement = document.getElementById("notification");
  notificationElement.innerHTML = "Có lỗi xảy ra khi tải danh sách tài khoản lừa đảo";
}
