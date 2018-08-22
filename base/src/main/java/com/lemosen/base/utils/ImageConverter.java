package com.lemosen.base.utils;



import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.*;
import java.io.*;

public class ImageConverter {

    private File file;

    public static final String JEP = "jpg";

    public static final String PNG = "png";

    public static final String JEPG = "jpeg";

    /**
     * 构造函数
     *
     * @param file           图片文件
     */
    public ImageConverter(File file) {
        this.file = file;
    }

    /**
     * 压缩jpg图片并保存
     *

     * @throws IOException
     * @throws FileNotFoundException
     */
    public byte[] compressJpg(int widthSize, int heightSize) throws IOException {
        BufferedImage bi = ImageIO.read(file);
        double width = bi.getWidth();
        double height = bi.getHeight();
        double ratio = width / height;
        double radioSize = widthSize / heightSize;
        Image itemp = null;
        ImageFilter cropFilter;
        if (ratio > radioSize) {
            // 缩放后的宽
            int scaledWidth = (int) (ratio * heightSize);
            // 开始缩放
            itemp = bi.getScaledInstance(scaledWidth, heightSize, BufferedImage.SCALE_SMOOTH);
            // 设置截切点
            cropFilter = new CropImageFilter((scaledWidth - widthSize) / 2, 0, widthSize, heightSize);//
        } else {
            // 缩放后的高
            int scaledHeight = (int) (widthSize / ratio);
            itemp = bi.getScaledInstance(widthSize, scaledHeight, BufferedImage.SCALE_SMOOTH);
            cropFilter = new CropImageFilter(0, (scaledHeight - heightSize) / 2, widthSize, heightSize);//
        }
        Image croppedImage = Toolkit.getDefaultToolkit().createImage(
                new FilteredImageSource(itemp.getSource(), cropFilter));
        BufferedImage tag = new BufferedImage(widthSize, heightSize, BufferedImage.TYPE_INT_RGB);
        Graphics g = tag.getGraphics();
        // 绘制缩小后的图
        g.drawImage(croppedImage, 0, 0, null);
        g.dispose();

        ByteArrayOutputStream imageStream = new ByteArrayOutputStream();
        boolean resultWrite = ImageIO.write(tag, JEP, imageStream);
        byte[] tagInfo = imageStream.toByteArray();
        return tagInfo;
    }

    /**
     * 压缩jpg图片并保存
     *
     * @throws IOException
     * @throws FileNotFoundException
     */
    public static byte[] compressIcon(int widthSize, int heightSize, InputStream inputStream, String imageType)
            throws IOException {
        BufferedImage bi = ImageIO.read(inputStream);
        double width = bi.getWidth();
        double height = bi.getHeight();
        double ratio = width / height;
        double radioSize = widthSize / heightSize;
        Image itemp = null;
        ImageFilter cropFilter;
        if (ratio > radioSize) {
            // 缩放后的宽
            int scaledWidth = (int) (ratio * heightSize);
            // 开始缩放
            itemp = bi.getScaledInstance(scaledWidth, heightSize, BufferedImage.SCALE_SMOOTH);
            // 设置截切点
            cropFilter = new CropImageFilter((scaledWidth - widthSize) / 2, 0, widthSize, heightSize);//
        } else {
            // 缩放后的高
            int scaledHeight = (int) (widthSize / ratio);
            itemp = bi.getScaledInstance(widthSize, scaledHeight, BufferedImage.SCALE_SMOOTH);
            cropFilter = new CropImageFilter(0, (scaledHeight - heightSize) / 2, widthSize, heightSize);//
        }
        Image croppedImage = Toolkit.getDefaultToolkit().createImage(
                new FilteredImageSource(itemp.getSource(), cropFilter));
        BufferedImage tag = new BufferedImage(widthSize, heightSize, BufferedImage.TYPE_INT_RGB);
        Graphics g = tag.getGraphics();
        // 绘制缩小后的图
        g.drawImage(croppedImage, 0, 0, null);
        g.dispose();

        ByteArrayOutputStream imageStream = new ByteArrayOutputStream();
        ImageIO.write(tag, imageType, imageStream);
        byte[] tagInfo = imageStream.toByteArray();
        return tagInfo;
    }

    public static BufferedImage resize(BufferedImage source, int targetW, int targetH) {
        // targetW，targetH分别表示目标长和宽
        int type = source.getType();
        BufferedImage target = null;
        double sx = (double) targetW / source.getWidth();
        double sy = (double) targetH / source.getHeight();
        // 这里想实现在targetW，targetH范围内实现等比缩放。如果不需要等比缩放
        // 则将下面的if else语句注释即可
        if (sx > sy) {
            sx = sy;
            targetW = (int) (sx * source.getWidth());
        } else {
            sy = sx;
            targetH = (int) (sy * source.getHeight());
        }
        if (type == BufferedImage.TYPE_CUSTOM) { // handmade
            ColorModel cm = source.getColorModel();
            WritableRaster raster = cm.createCompatibleWritableRaster(targetW, targetH);
            boolean alphaPremultiplied = cm.isAlphaPremultiplied();
            target = new BufferedImage(cm, raster, alphaPremultiplied, null);
        } else
            target = new BufferedImage(targetW, targetH, type);
        Graphics2D g = target.createGraphics();
        // smoother than exlax:
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.drawRenderedImage(source, AffineTransform.getScaleInstance(sx, sy));
        g.dispose();
        return target;
    }

    public static byte[] compressImageByte(InputStream inputStream, int width, int hight, String imageType)
            throws Exception {
        BufferedImage srcImage;
        srcImage = ImageIO.read(inputStream);
        if (width > 0 || hight > 0) {
            srcImage = resize(srcImage, width, hight);
        }
        ByteArrayOutputStream imageStream = new ByteArrayOutputStream();
        ImageIO.write(srcImage, imageType, imageStream);
        byte[] tagInfo = imageStream.toByteArray();
        return tagInfo;

    }

    /**
     * 压缩jpg图片并保存
     *
     * @throws IOException
     * @throws FileNotFoundException
     */
    public void compressJpg(int widthSize, int heightSize, String imagePath)
            throws IOException {
        BufferedImage bi = ImageIO.read(file);
        Image croppedImage = createCropImage(widthSize, heightSize, bi);
        BufferedImage tag = new BufferedImage(widthSize, heightSize, BufferedImage.TYPE_INT_RGB);
        Graphics g = tag.getGraphics();
        // 绘制缩小后的图
        g.drawImage(croppedImage, 0, 0, null);
        g.dispose();

        OutputStream smallOut = new FileOutputStream(imagePath);
        ImageIO.write(tag, JEP, smallOut);
        smallOut.close();
    }


    public void compressPng(int widthSize, int heightSize, String imagePath)
            throws IOException {
        BufferedImage bi = ImageIO.read(file);
        Image croppedImage = createCropImage(widthSize, heightSize, bi);
        BufferedImage tag = new BufferedImage(widthSize, heightSize, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = tag.createGraphics();
        tag = g2d.getDeviceConfiguration().createCompatibleImage(widthSize, heightSize, Transparency.TRANSLUCENT);
        g2d.dispose();
        g2d = tag.createGraphics();
        g2d.drawImage(croppedImage, 0, 0, null);
        g2d.dispose();
        OutputStream smallOut = new FileOutputStream(imagePath);
        ImageIO.write(tag, PNG, smallOut);
        smallOut.close();
    }

    /**
     * 获得缩放后的图片
     *
     * @param widthSize
     * @param heightSize
     * @param bi
     * @return
     */
    private Image createCropImage(int widthSize, int heightSize, BufferedImage bi) {
        double width = bi.getWidth();
        double height = bi.getHeight();
        double ratio = width / height;
        double radioSize = widthSize / heightSize;
        Image itemp = null;
        ImageFilter cropFilter;
        if (ratio > radioSize) {
            // 缩放后的宽
            int scaledWidth = (int) (ratio * heightSize);
            // 开始缩放
            itemp = bi.getScaledInstance(scaledWidth, heightSize, BufferedImage.SCALE_SMOOTH);
            // 设置截切点
            cropFilter = new CropImageFilter((scaledWidth - widthSize) / 2, 0, widthSize, heightSize);//
        } else {
            // 缩放后的高
            int scaledHeight = (int) (widthSize / ratio);
            itemp = bi.getScaledInstance(widthSize, scaledHeight, BufferedImage.SCALE_SMOOTH);
            cropFilter = new CropImageFilter(0, (scaledHeight - heightSize) / 2, widthSize, heightSize);//
        }
        Image croppedImage = Toolkit.getDefaultToolkit().createImage(new FilteredImageSource(itemp.getSource(), cropFilter));
        return croppedImage;
    }

    /**
     * lemosen
     *
     * @throws IOException
     * @throws FileNotFoundException
     */
    public void compressAll(int widthSize, int heightSize, String imagePath, String type)
            throws IOException {
        BufferedImage bi = ImageIO.read(file);
        Image croppedImage = createCropImage(widthSize, heightSize, bi);
        BufferedImage tag = new BufferedImage(widthSize, heightSize, BufferedImage.TYPE_INT_RGB);
        Graphics g = tag.getGraphics();
        // 绘制缩小后的图
        g.drawImage(croppedImage, 0, 0, null);
        g.dispose();

        OutputStream smallOut = new FileOutputStream(imagePath);
        ImageIO.write(tag, type, smallOut);
        smallOut.close();
    }
}
