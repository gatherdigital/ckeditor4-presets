/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.language = 'en';
	config.filebrowserFlashUploadUrl = "/ckeditor/attachment_files";
	config.filebrowserImageUploadUrl = "/ckeditor/pictures";
	config.filebrowserUploadUrl = "/ckeditor/attachment_files";
	config.toolbar_GatherDigital = [
	    ['Bold', 'Italic', '-', 'Format', '-', 'BulletedList', '-', 'Link', 'Unlink','-','Source', '-', 'Image', '-', 'DDF']
	];
	config.toolbar = 'GatherDigital';
  config.height = 120;

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

  config.forcePasteAsPlainText = true;
	config.pasteFromWordRemoveFontStyles = true;
	config.allowedContent = true;
	config.disableNativeSpellChecker = false;

	config.allowedContent = true;
};
