import { useSubmit } from "@remix-run/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone-esm";
import { cn } from "~/lib/utils";

export default function Dropzone() {
	const submit = useSubmit();

	const submitImage = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length === 0) return;
			const formData = new FormData();
			formData.append("custom-icon", acceptedFiles[0]);
			submit(formData, { method: "post", encType: "multipart/form-data" });
		},
		[submit],
	);

	const {
		getRootProps,
		getInputProps,
		isFocused,
		isDragAccept,
		isDragReject,
		isDragActive,
	} = useDropzone({
		multiple: false,
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpeg", ".jpg"],
		},
		onDrop: submitImage,
	});

	return (
		<section className="flex w-full max-w-[1100px] flex-row">
			<div
				{...getRootProps()}
				className={cn(
					"flex-1 cursor-pointer rounded-lg border-2 border-dashed border-gray-400 p-8 text-gray-400",
					isFocused ? "border-sky-slate-800" : "",
					isDragAccept ? "border-green-800 text-green-800" : "",
					isDragReject ? "cursor-not-allowed border-red-500 text-red-500" : "",
				)}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center gap-4">
					<p className="text-center text-sm">
						{!isDragAccept && !isDragReject
							? "Drag and drop the image here or click to select a file"
							: null}
						{isDragAccept && isDragActive ? "Drop the image here" : null}
						{isDragReject && isDragActive
							? "This file type is not supported"
							: null}
					</p>
					<p className="text-sm text-gray-400">
						Supported file types: .png, .jpeg
					</p>
				</div>
			</div>
		</section>
	);
}
