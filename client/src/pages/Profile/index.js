import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';

import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
    const profile = useSelector(state => state.user.provile);
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu email" />
                <hr />
                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmação da nova senha"
                />
                <button type="submit">Atualizar perfil</button>
            </Form>

            <button type="button">Sair do GoBarber</button>
        </Container>
    );
}
