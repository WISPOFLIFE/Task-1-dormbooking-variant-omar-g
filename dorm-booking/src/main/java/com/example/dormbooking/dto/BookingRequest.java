package com.example.dormbooking.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class BookingRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long roomId;

    @NotNull
    @Size(min = 1, max = 255)
    private String bookingDate;

    @NotNull
    @Size(min = 1, max = 255)
    private String checkInDate;

    @NotNull
    @Size(min = 1, max = 255)
    private String checkOutDate;

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
}