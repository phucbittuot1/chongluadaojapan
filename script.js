const search = () => {
  const query = document.getElementById("search-input").value.trim();
  if (query === "") {
    document.getElementById("result").innerHTML = "Vui lòng nhập tên tài khoản hoặc số tài khoản để kiểm tra!";
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.jsonbin.io/v3/b/643a1b26ace6f33a220ba07b/latest", true);
  xhr.setRequestHeader("X-Master-Key", "$2b$10$1/Xt/xV7B0MueH2HdEbqAekImCKdJxOSnLRiC.c0qR4fep7Qe8Nu6");
  xhr.setRequestHeader("X-Api-Key", "$2b$10$dkhK8Q8mhMvf61LwaqGrx.upnYnRJSVrc3pTj4Gd74lt5oLbLd8.W");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const results = data.record.filter((item) => item.ten_tai_khoan === query || item.so_tai_khoan === query);
      if (results.length > 0) {
        let resultHtml = "";
        results.forEach((result) => {
          resultHtml += `Tài khoản <b>${result.ten_tai_khoan}</b> với số tài khoản <b>${result.so_tai_khoan}</b> đã bị đưa vào danh sách đen vì lừa đảo!<br>`;
        });
        document.getElementById("result").innerHTML = resultHtml;
      } else {
        document.getElementById("result").innerHTML = `Không tìm thấy thông tin tài khoản <b>${query}</b> trong danh sách đen.`;
      }
    } else {
      document.getElementById("result").innerHTML = "Lỗi kết nối đến server. Vui lòng thử lại sau.";
    }
  };
  xhr.onerror = () => {
    document.getElementById("result").innerHTML = "Lỗi kết nối đến server. Vui lòng thử lại sau.";
  };
  xhr.send();
};
