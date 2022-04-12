import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { Request } from 'express';

const uploadPath = (dest: string) => {
	const uploadDir = path.join(__dirname, '..', '..', 'public', dest)

	createDirIfNotExists(uploadDir);

	return uploadDir;
};

const createDirIfNotExists = (dir: string) => {
	if(! fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

export const getUploadedPath = (absolutePath: string) => {
	const path = 'public' + absolutePath.split('/public')[1];
	return path;
}


export const getFilesPaths = (req: Request) => {
	const paths: {[key: string]: string} = {};

	const keys = Object.keys(req.files!);

	if(req.files) {
		for (let i = 0; i < keys.length; i++) {	
			const key = keys[i];
			// @ts-ignore					
			paths[key] = req.files[keys[i]][0].path;
		}
	}

	return paths;
}

export const deleteUploadsOnFailure = (req: Request) => {
	if (req.file) fs.unlinkSync(req.file.path);

	if (req.files) {
		const paths = getFilesPaths(req);
		
		Object.keys(paths).forEach((key: string) => fs.unlinkSync(paths[key]));
	}
}

const upload =
	(dest: string): multer.Multer => {
		const storage = multer.diskStorage({
			destination: (req, file, callback) => {
				callback(null, uploadPath(dest));
			},
			filename: (req, file, callback) => {
				callback(null, Date.now() + '--' + file.originalname);
			},
		});

		return multer({ storage });
	};

export default upload;
