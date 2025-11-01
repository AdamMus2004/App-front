import userApi from './axios';

async function test() {
    try {
        const res = await userApi.get('/auth/users');
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}

test();
