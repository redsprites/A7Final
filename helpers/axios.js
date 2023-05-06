
const ax = {
    endpoint: 'http://localhost:8080/api/blogs/',
    getCookie: function (name) {
        console.log(document.cookie);
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          console.log('Cookie:', cookie); // Log the current cookie
      
          if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring((name + '=').length, cookie.length);
          }
        }
        return null;
      },
      
      
    GET: function (callback) {
        axios.get(`${ax.endpoint}`, {}).then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    GET_ONE: function (id, callback) {
        axios.get(`${ax.endpoint}${id}`, {}).then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    GET_USER: function (id, callback) {
        axios.get(`http://localhost:8080/api/users/${id}`, {}).then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    POST: function (data, callback) {
        const token = this.getCookie('token');
        console.log(token);
        axios
          .post(`${this.endpoint}`, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(function (response) {
            callback(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      },      

}
