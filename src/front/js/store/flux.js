const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			register: async (data) => {
				try{
					let response = await fetch("https://literate-cod-4jqjq5654gg9fqrvq-3001.app.github.dev/api/user",{
						method:"POST",
						body: JSON.stringify(data),
						headers:{
							"Content-Type": "application/json"
						}
					})
					let respuesta = await response.json()
					if (respuesta.ok)
					{
						console.log("El usuario se ha registrado")
					}
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			login: async (data) => {
				try {
					let response = await fetch("https://literate-cod-4jqjq5654gg9fqrvq-3001.app.github.dev/api/login",{
						method:"POST",
						body: JSON.stringify(data),
						headers:{
							"Content-Type": "application/json"
						}
					})

					let respuesta = await response.json()
					if(respuesta)
					{
						console.log(respuesta)
						localStorage.setItem("token", respuesta.token)
						localStorage.setItem("name", respuesta.user)
						localStorage.setItem("email", respuesta.email)
					}
				} catch (error) {
					return ("Error loading message from backend", error)
				}
			},
			cerrar_sesion: () => {
				localStorage.clear()
			},

			getUsers: async () => {
				let token = localStorage.getItem("token")
				try {
					let response = await fetch("https://literate-cod-4jqjq5654gg9fqrvq-3001.app.github.dev/api/users",{
						headers:{
							Authorization:`Bearer ${token}`
						}
					})
					

					let data = await response.json()
					console.log(data)
					
				} catch (error) {
					return ("Error loading message from backend", error)
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
