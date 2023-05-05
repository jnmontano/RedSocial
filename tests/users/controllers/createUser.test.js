const { assert } = require('chai')
const { it, describe } = require('mocha')

const { createUser } = require('../../../src/users/users.controllers')

describe('Suite de testing para el controlador de crear usuarios', () => {
    it('Deberia de generar un error si le mandamos un objeto vacio', ( done ) => {
        createUser({})
        .then((data) => {
            
        })
        .catch((err) => {
            assert.exists(err)
            done()
        });
    })

    it('Deberia generar un error si no le mandamos la propiedad password', (done) => {
        const userObj = {
            firstName: 'Nelson',
            lastName: 'Montaño',
            email: `${uuid.v4()}@nelo.com`,
            birthday: '11/07/1976',
            phone:'1234567'
        }
        createUser(userObj)
        .then((data) => {
            
        }).catch((err) => {   
            assert.exists(err)         
            done(err)
        });
    })

    it('Deberia generar el usuario creado al pasarle todos los datos', (done) => {
        const userObj = {
            firstName: 'Nelson',
            lastName: 'Montaño',
            email: `${uuid.v4()}@nelo.com`,
            password: 'root',            
            phone:'1234567'            
        }
        createUser(userObj)
        .then((data) => {
            assert.property('id')
            done()
        }).catch((err) => {            
            done(err)
        });
    })
})