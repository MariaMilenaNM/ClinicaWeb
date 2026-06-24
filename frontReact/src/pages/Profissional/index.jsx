import React from 'react';
import { Link } from 'react-router-dom';
import { useProfissional } from '../../hooks/useProfissional';
import '../../styles/login.css';

export default function Profissional() {
    const {
        profissionais, form, setForm, editForm, setEditForm,
        handleCreate, abrirEdicao, handleUpdate, handleDelete
    } = useProfissional();

    return (
        <>  
            <Link to="/" className="btn-sair">Sair</Link>
            <div className="card">
                <section id="telaR">
                    <h2>Registre-se como psicólogo na nossa clínica</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={form.nome}
                            onChange={(e) => setForm({...form, nome: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="CRP (ex: 06/12345)"
                            value={form.crp}
                            onChange={(e) => setForm({...form, crp: e.target.value})}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={form.modPresencial}
                                onChange={(e) => setForm({...form, modPresencial: e.target.checked})}
                            /> Presencial
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={form.modRemota}
                                onChange={(e) => setForm({...form, modRemota: e.target.checked})}
                            /> Remota
                        </label>
                        <input
                            type="text"
                            placeholder="Instagram (ex: @usuario)"
                            value={form.link}
                            onChange={(e) => setForm({...form, link: e.target.value})}
                        />
                        <input
                            type="tel"
                            placeholder="Número de telefone"
                            value={form.numero}
                            onChange={(e) => setForm({...form, numero: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="E-mail de contato"
                            value={form.contato}
                            onChange={(e) => setForm({...form, contato: e.target.value})}
                        />
                        <button type="button" onClick={handleCreate}>Salvar</button>
                    </div>

                    {/* Tabela de profissionais cadastrados */}
                    {profissionais.length > 0 && (
                        <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CRP</th>
                                    <th>Modalidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profissionais.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.nome}</td>
                                        <td>{p.crp}</td>
                                        <td>{p.modalidade}</td>
                                        <td>
                                            <button onClick={() => abrirEdicao(p.id)}>Editar</button>
                                            <button onClick={() => handleDelete(p.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {editForm && (
                        <div id="editar" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '400px' }}>
                            <h3 style={{ color: '#fff' }}>Editando: {editForm.nome}</h3>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={editForm.nome || ''}
                                onChange={(e) => setEditForm({...editForm, nome: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="CRP"
                                value={editForm.crp || ''}
                                onChange={(e) => setEditForm({...editForm, crp: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Instagram"
                                value={editForm.link || ''}
                                onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                            />
                            <input
                                type="tel"
                                placeholder="Número"
                                value={editForm.numero || ''}
                                onChange={(e) => setEditForm({...editForm, numero: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Contato"
                                value={editForm.contato || ''}
                                onChange={(e) => setEditForm({...editForm, contato: e.target.value})}
                            />
                            <button onClick={handleUpdate} style={{ padding: '10px', cursor: 'pointer' }}>Confirmar Edição</button>
                            <button onClick={() => setEditForm(null)} style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'gray' }}>Cancelar</button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}