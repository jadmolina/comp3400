from flask import Flask, jsonify, request

import mariadb
import sys

#imporst db access config
from config import DATABASE_CONFIG

app = Flask(__name__)

try:
        conn = mariadb.connect(**DATABASE_CONFIG)
except mariadb.Error as e:
        print(f"Error  on connection: {e}")
        sys.exit(1)

cursor = conn.cursor()


@app.route('/api/hello', methods=['GET'])
def hello_world():
        return jsonify({'message': '¡Hola, mundo con Flask!'})

@app.route('/api/misdatos/', methods=['GET'])
def mis_datos():
        return jsonify({'datos': '** SU NOMBRE ** !'})


@app.route('/api/get_users', methods=['GET'])
def get_users():
    cursor.execute("SELECT * FROM Usuarios")
    users = cursor.fetchall()
    list = []
    for user in users:
        list.append({
              "id_usuario":user[0],
              "nombre":user[1],
              "apellido":user[2],
              "email":user[3],
              "contrasena":user[4],
              "rol":user[5]
        })
    # Convertir los resultados en un formato más amigable o devolverlos directamente
    response = jsonify({"data":list})
    response.headers.add("Content-type",'application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/get_user/<int:id>', methods=['GET'])
def get_user(id):
    if (id == 0):
           return jsonify({"error":"Invalid ID"}), 404
    else:
        cursor.execute("SELECT * FROM Usuarios where id_usuario = ?", (id,))
        user = cursor.fetchone()
        # Convertir los resultados en un formato más amigable o devolverlos directamente
        return jsonify(user)

@app.route('/api/new_user', methods=['POST'])
def new_user():
        datos = request.json
        name = datos.get('nombre')
        lastname = datos.get('apellido')
        email = datos.get('email')
        pwd = datos.get('contrasena')
        role = datos.get('rol')
        
        strQry = 'insert into Usuarios '
        strQry += "(nombre, apellido, email, contrasena, rol) "
        strQry += f"values ('{name}','{lastname}','{email}','{pwd}','{role}')"

        cursor.execute(strQry)
        conn.commit()

        response = {"message":"Record inserted"}
    
        return jsonify(response) , 200

@app.route('/api/update_user', methods=['POST'])
def update_user():
        datos = request.json
        id_usuario = datos.get('id_usuario')
        name = datos.get('nombre')
        lastname = datos.get('apellido')
        email = datos.get('email')
        pwd = datos.get('contrasena')
        role = datos.get('rol')
        
        strQry = 'update Usuarios '
        strQry += f"set nombre = '{name}', "
        strQry += f"apellido = '{lastname}', "
        strQry += f"email = '{email}', "
        strQry += f"contrasena = '{pwd}', "
        strQry += f"rol = '{role}' "
        strQry += f"where id_usuario = {id_usuario} "

        cursor.execute(strQry)
        conn.commit()

        response = {"message":"Record updated"}
    
        return jsonify(response) , 200


@app.route('/api/del_user/<int:id>', methods=['GET'])
def del_user(id):
#     datos = request.json
#     id = datos.get('id')    
    print(id)
    if (id == 0):
           return jsonify({"error":"Invalid ID"}), 404
    else:
        cursor.execute("DELETE FROM Usuarios WHERE id_usuario = ?", (id,))
        conn.commit()
        return jsonify({"message": "User deleted"}), 200

# Obtener los datos de los semestres
@app.route('/api/get_terms', methods=['GET'])
def get_terms():
    cursor.execute("SELECT * FROM Semestres")
    terms = cursor.fetchall()
    list = []
    for term in terms:
        list.append({
              "id_semestre":term[0],
              "nombre":term[1],
              "fecha_inicio":term[2],
              "fecha_fin":term[3],
        })
    # Convertir los resultados en un formato más amigable o devolverlos directamente
    response = jsonify({"data":list})
    response.headers.add("Content-type",'application/json')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000)

