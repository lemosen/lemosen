package com.lemosen.core.utils;


import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 添加水印
 */
public class WaterMarkUtils {
    /**
     * BufferedImage Graphics2D 用语多次添加不同水印
     */
    private BufferedImage bufImg;

    private Graphics2D g;
    /**
     * 生成图片路径
     */
    private String tarImgPath;

    private String imgType;

    public WaterMarkUtils(String tarImgPath, String srcPath, String imgType) throws IOException {
        //初始化
        File srcImgFile = new File(srcPath);
        Image srcImg = ImageIO.read(srcImgFile);
        int srcImgWidth = srcImg.getWidth(null);
        int srcImgHeight = srcImg.getHeight(null);
        this.bufImg = new BufferedImage(srcImgWidth, srcImgHeight, BufferedImage.TYPE_INT_RGB);
        this.tarImgPath = tarImgPath;
        this.imgType = imgType;
        this.g = this.bufImg.createGraphics();
        //画底
        g.drawImage(srcImg, 0, 0, srcImgWidth, srcImgHeight, null);
    }


    /**
     * 添加水印 可多次
     *
     * @param waterMarkContent 水印字
     * @param markContentColor 水印颜色
     * @param font             字体
     * @param x                水印x
     * @param y                水印y
     */
    public void addWaterMarks(String waterMarkContent, Color markContentColor, Font font, int x, int y) {
        g.setColor(markContentColor);
        g.setFont(font);
        g.drawString(waterMarkContent, x, y);
    }

    /**
     * 输出图片
     */
    public void outImg() throws IOException {
        g.dispose();
        FileOutputStream outImgStream = new FileOutputStream(tarImgPath);
        ImageIO.write(bufImg, imgType, outImgStream);
        outImgStream.flush();
        outImgStream.close();
        System.out.println("----------------添加水印完成----------------------");
    }

    /**
     * 获取水印长度？
     *
     * @param waterMarkContent
     * @param g
     * @return
     */
    public int getWatermarkLength(String waterMarkContent, Graphics2D g) {
        return g.getFontMetrics(g.getFont()).charsWidth(waterMarkContent.toCharArray(), 0, waterMarkContent.length());
    }

}

