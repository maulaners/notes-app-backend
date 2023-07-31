const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
	const { tittle, tags, body } = request.payload;
	
	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updateAt = createdAt;
	
	const newNote = {
		tittle, tags, body, id, createdAt, updateAt,
	};
	notes.push(newNote);
	
	const isSuccess = notes.filter((note) => note.id === id).length > 0;
	if (isSuccess) {
		const responses = h.response({
			status: 'success',
			message: 'catatan bergasil ditambahkan',
			data: {
				noteId: id,
			},
		});
		response.code(201);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'catatan gagal ditambahkan',
	});
	response.code(500);
	return response;
};

const getAllNotesHandler = () => ({
	status: 'success',
	data:{
		notes,
	},
});

const getNoteByIdHandler = (request, h)=>{
	const { id } = request.params;
	const note = notes.filter((n) => n.id === id)[0];
	
	if (note !== undefined) {
		return {
			status:'success',
			data:{
				note,
			},
		};
	}
	const response = response({
		status: fail,
		message: 'catatan tidak ditemukan',
	});
	response.code(404);
	return response;
};

const editNoteByIdHandler = (request,h) => {
	const {id} = request.params;
	const {tittle, tags, body} = request.payload;
	const updateAt = new Date().toISOString();
	const index =notes.findIndex((note) => note.id === id);
	
	if (index !== -1){
		notes[index]= {
			...notes[index],
			tittle,
			tags,
			body,
			updateAt,
		};
		const response = h.response({
			status: 'success',
			message: 'catatan berhasil diperbarui',
		});
		response.code(200);
		return response;
	}
	const response = h.response({
			status: 'gagal',
			message: 'gagal memperbarui catatan, Id tidak ditemukan',
		});
		response.code(404);
		return response;
	}
};

const deleteNoteByIdHandler = (request, h) => {
	const {id} = request.params;
	const index= notes.findIndex((note) =>note.id === id);
	
	if (index !== -1){
	notes.splice(index, 1);
	const response = h.response({
		status: 'success',
		message: 'catatan berhasi dihapus',
	});
	response.code(200);
	return response;
	}
const respnse = h.response({
	status: 'fail',
	message: 'catatan gagal dihapus, Id tidak diemukan',
});
response.code(404);
return response;
}
module.exports = { 
	addNoteHandler, 
	getAllNotesHandler, 
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler,
};