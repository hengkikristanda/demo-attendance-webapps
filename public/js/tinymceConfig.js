tinymce.init({
	selector: "#myTextArea",
	plugins: "image link lists media table",
	toolbar:
		"blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent removeformat",
	automatic_uploads: false,
	image_description: false,
	image_uploadtab: false,
	images_upload_url: "/crud/uploads/attachedImage",
	images_upload_credentials: true,
	image_title: false,
	images_file_types: "jpg,webp,png",
	file_picker_types: "image",
	block_unsupported_drop: true,
	min_height: 1000,
	media_alt_source: false,
	media_live_embeds: true,

	file_picker_callback: (callback, value, meta) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");

		input.addEventListener("change", (e) => {
			const file = e.target.files[0];

			uploadFile(file)
				.then(function (url) {
					// Call the callback with the URL of the uploaded image
					callback(url, {
						alt: file.name,
					});
				})
				.catch(function (error) {
					console.error("File upload failed:", error);
				});
		});

		input.click();
	},
});
