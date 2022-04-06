import multer from 'multer';
import path from 'path';
import fs from 'fs'

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
