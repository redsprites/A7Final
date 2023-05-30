const companies = {
	index: async function (jobTitle) {
		console.log("index Called");
		$('#blogs').html('Loading Companies, please wait...');
		try{
			var btns = $("#btns");
			var index = getAllUrlParams().page;
			if (index == null || isNaN(index)) {
				index = 0;
			}
		
			const items = await ax.GET_COMPANIES(jobTitle); 
			console.log(items);
			if (index >= (items.companiesFound.length / 10) || index < 0 || index == null) {
				$("body").html(`<h1 style="color: #555; font-size: 50px; margin-top: 50px; text-align: center; font-family: Arial, sans-serif">Error 404: Page not found</h1>
			 	<p style = "font-size: 20px; color: #888; margin-bottom: 50px; text-align: center; font-family: Arial, sans-serif">Sorry, the page you're looking for doesn't exist.</p>`);
			}
			btns.append(`
			 <div style="padding-bottom: 20px; display: flex; justify-content: space-evenly; align-items: center">
			 <a href="index.html?page=${(index - 1) < 0 ? ((items.companiesFound.length / 10) - 1) : (index - 1)}" role="button" class="btn btn-primary text-uppercase">Previous</a>
			 <a href="index.html?page=${(parseInt(index) + 1) >= (items.companiesFound.length / 10) ? 0 : (parseInt(index) + 1)}" role="button" class="btn btn-primary text-uppercase">Next</a>
			 </div>`);
			
			console.log(items.companiesFound.length);
			
				$('#blogs').empty();
				var endIndex = (10 * 10) + items.companiesFound.length % 10;
				if (endIndex > items.companiesFound.length) {
					endIndex = items.companiesFound.length;
				}
				console.log(endIndex);
				
				for (let i = index * 10; i < endIndex; i++) {
					let company = items.companiesFound[i];
					let el = $('<div>').html(`
						<div class="post-preview">
							<a href="${company.link}">
								<h2 class="post-title">${company.title}</h2>
								<h3 class="post-subtitle">Company: ${company.company}</h3>
								<p class="post-subtitle">Description: ${company.description}</p>
								<p class="post-subtitle">Published Date: ${company.pubDate}</p>
							</a>	
						</div>
					`);
					$('#post-preview').append(el);
				}
			}				
		catch(error){
			console.log('Error fetching data:', error);
		}
	},
};
