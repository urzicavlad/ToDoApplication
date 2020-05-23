﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ToDoApp.Models;

namespace ToDoApplication.Migrations
{
    [DbContext(typeof(ToDoContext))]
    [Migration("20200523070757_InitializeMigration")]
    partial class InitializeMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ToDoApp.Models.Comment", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Important")
                        .HasColumnType("bit");

                    b.Property<long?>("TaskId")
                        .HasColumnType("bigint");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("ToDoApp.Models.Task", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Added")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ClosedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Importance")
                        .HasColumnType("int");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tasks");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Added = new DateTime(2020, 5, 23, 10, 7, 57, 183, DateTimeKind.Local).AddTicks(2440),
                            Deadline = new DateTime(2020, 5, 25, 10, 7, 57, 185, DateTimeKind.Local).AddTicks(9729),
                            Description = "Descritpion",
                            Importance = 2,
                            State = 1,
                            Title = "Task 1"
                        });
                });

            modelBuilder.Entity("ToDoApp.Models.Comment", b =>
                {
                    b.HasOne("ToDoApp.Models.Task", "Task")
                        .WithMany("Comments")
                        .HasForeignKey("TaskId");
                });
#pragma warning restore 612, 618
        }
    }
}
