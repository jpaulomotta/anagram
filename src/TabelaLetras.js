import React from 'react'

export default ({letras}) => (
    <table className="table col-2">
        {Object.keys(letras).map(letra => (
            <tr>
                <td>{letra}</td>
                <td>{letras[letra]}</td>
            </tr>
        ))}
    </table>
)