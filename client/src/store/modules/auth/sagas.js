import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { signInSuccess, signFailure } from './action';

import api from '~/services/api';
import history from '~/services/history';

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;

        yield call(api.post, 'users', {
            name,
            email,
            password,
            provider: true,
        });

        history.push('/');
    } catch (error) {
        toast.error('Falha no cadastro, verifique seus dados');

        yield put(signFailure());
    }
}

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('Usuário não é prestador');
            return;
        }

        yield put(signInSuccess(token, user));

        history.push('/dashboard');
    } catch (error) {
        toast.error('Falha na autenticação, verifique seus dados');
        yield put(signFailure());
    }
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_Up_REQUEST', signUp),
]);
