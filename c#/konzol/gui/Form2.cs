using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace gui
{
    public partial class Form2 : Form
    {
        public Form2(string name, int value, int id)
        {
            InitializeComponent();
            label1.Text = "Műalkotás neve: " + name;
            label2.Text = "Műalkotás értéke: " + value;
            label3.Text = "Műalkotás azonosítója: " + id;

            this.FormClosing += Valtas;
        }

        public void Valtas(object s, EventArgs e)
        {
            Form1 form = new Form1();
            form.Show();
            this.Hide();
        }
    }
}
