const ax ={
	endpoint:'http://localhost:8080/api/blogs/',
	GET:function(callback){
		axios.get(`${ax.endpoint}`,{}).then(function(response){
			callback(response.data); 
			})
		.catch(function(error){
			console.log(error);
		});
	}
}