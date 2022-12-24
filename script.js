const flname = document.getElementById('id_filename');

const flopen = document.getElementById('id_opfile');
const flsave = document.getElementById('id_safile');
const flsaveas = document.getElementById('id_saasfile');

const info = document.getElementById('id_info');
const editor = document.getElementById('id_editor');

let isRewrite = false;

function checkSave() {
	if(isRewrite) {
		flname.textContent += '*';
	}
	else {
	}
}

const textType = {
	description: "Source File",
	accept: {"text/plain": [".txt", ".js"]}
};

info.onclick = () => {window.alert('このサイトは鯖によって作られました。\nThis site is made by Savaharu.')}

flopen.onclick = async () => {
	try {
		const flArray = await window.showOpenFilePicker({textType});
		const fl = flArray[0];
		const fd = await fl.getFile();
		
		editor.value = await fd.text();
		
		flname.textContent = fl.name;
	}
	catch(e) {console.log(e);}
}

flsave.onclick = async () => {
	isRewrite = false;
	checkSave();
	try {
		if(flname.textContent.match('SavaCode')) {
			try {
				fl = await window.showSaveFilePicker({textType});
				const ws = await fl.createWritable();
				await ws.write(editor.value);
				flname.textContent = fl.name;
				await ws.close();
			}
			catch(e) {console.log(e);}
		}
		else {
			const ws = await fl.createWritable();
			await ws.write(editor.value);
			await ws.close();
		}
	}
	catch(e) {
		console.log(e);
	}
}


flsaveas.onclick = async () => {
	try {
		fl = await window.showSaveFilePicker({textType});
		const ws = await fl.createWritable();
		await ws.write(editor.value);
		flname.textContent = fl.name;
		await ws.close();
	}
	catch(e) {console.log(e);}
}

editor.addEventListener('input', () => {
	isRewrite = true;
	checkSave();
}, {once: true})

editor.addEventListener('keydown', (e) => {
	
	if(e.key == 'Tab') {
		editor.value = editor.value.substr(0, editor.selectionStart) + '\t' + editor.value.substr(editor.selectionStart, editor.value.length);
	}
})