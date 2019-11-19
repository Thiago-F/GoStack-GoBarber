module.exports = {
    up: (queryInterface, Sequelize) => {
        /* adicionando o campo avatar_id na tabela users referenciando a
         tabela files */
        return queryInterface.addColumn('users', 'avatar_id', {
            type: Sequelize.INTEGER,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE', // quando o arquivo na tabela files sofrer alterações
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('users', 'avatar_id');
    },
};
