export default defineEventHandler(async (event) => {
    const session = event.context.session;
  
    const orders = await fetch('https://api.youcanshop.dev/orders', {
        headers: {
            Authorization: 'Bearer ' + session.accessToken
        }
    })

    return await orders.json();
})