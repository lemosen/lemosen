package com.lemosen.web;

import com.lemosen.core.utils.ImageConverter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
/**
 * badapple字符视频
 * @author Cristiano雯夏
 *
 */
public class Test {
    /**
     * @param path
     *            图片路径
     */
    public static void createAsciiPic(final String path) {
        final String base = "~`+-*/.";// 字符串由复杂到简单
        try {
            final BufferedImage image = ImageIO.read(new File(path));
            for (int y = 0; y < image.getHeight(); y += 2) {
                for (int x = 0; x < image.getWidth(); x++) {
                    final int pixel = image.getRGB(x, y);
                    final int r = (pixel & 0xff0000) >> 16, g = (pixel & 0xff00) >> 8, b = pixel & 0xff;
                    final float gray = 0.299f * r + 0.578f * g + 0.114f * b;
                    final int index = Math.round(gray * (base.length() + 1) / 255);
                    System.out.print(index >= base.length() ? " " : String.valueOf(base.charAt(index)));
                }
                System.out.println();
            }
        } catch (final IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * test
     *
     * @param args
     */
    public static void main(final String[] args) {
        File fileDir = new File("/Users/hfy/Desktop/IMG_6213.png");
        String resPath="/Users/hfy/Desktop/test/";
        if (!fileDir.exists()) {
            fileDir.mkdirs();
        }
        try {
            File newFile = new File( resPath+ File.separator + "test.png");
//            file.getFileItem().write(newFile);
            ImageConverter imageConverter = new ImageConverter(fileDir);
//            String imageType = TmImgUtil.checkImageType(TmImgUtil.image2Bytes(newFile));
            BufferedImage bufferedImage = ImageIO.read(new FileInputStream(fileDir));
            double imgWidth = bufferedImage.getWidth();
            double imgHeight = bufferedImage.getHeight();
            int width = 100;
            int height = (int) (100*imgHeight/imgWidth);
//            switch (imageType) {
//                case "jpg": {
//                    imageConverter.compressAll(width, height, filePath+resPath+newUploadFileName, ImageConverter.JEP);
//                    break;
//                }
//                case "png": {
                    imageConverter.compressAll(width, height,resPath+ File.separator + "test.png", ImageConverter.PNG);
//                    break;
//                }
//                case "jpeg": {
//                    imageConverter.compressAll(width, height, filePath+resPath+newUploadFileName, ImageConverter.JEPG);
//                    break;
//                }
//                default:{
//                    log.error("-----------------------------未知类型");
//                }
//            }
//            return resPath+newUploadFileName;
            Test.createAsciiPic(resPath+ File.separator + "test.png");

        } catch (Exception e) {
            e.printStackTrace();
//            log.error("图片压缩报错");
//            return "0";
        }
//        ImageConverter.compressAll(200,200,"/Users/hfy/Desktop/bd_logo1.png","png");
    }

}
