
describe("Pendaftaran Testing",()=>{
    
    it('Sukses Daftar',()=>{
        cy.visit(Cypress.config('baseURL'),{ timeout: 80000 })
        cy.get('#customer_email').type('anda@domainkita.com',{force:true})
        cy.get('#customer_firstname').type('Joko')
        cy.get('#customer_lastname').type('Purwanto')
        cy.get('#customer_address').type('Blawong')
        cy.get('#customer_city').type('Bantul')
        cy.get('#customer_phone').type('085267788866')
        cy.get('#customer_mobile').type('08892822222')
        cy.get('#customer_ktp').type('11111111111')
        cy.get('#customer_sim').type('22222222222')
        cy.get('#customer_status').select('Pegawai Swasta')
        cy.get('#company_name').type('PT. Maju Lancar')
        cy.get('#company_phone').type('085267890888')
        cy.get('#company_address').type('Bantul')

        const uploadKTP='/images/ktp.jpg'
        cy.get('#customer_ktp_file').attachFile(uploadKTP).wait(5000)
        
        cy.get('#agreement[type="checkbox"]').check()
        cy.get('#wp-view[type="button"]').click({force:true})
        
    })

    it('Seluruh Field Inputan Kosong',()=>{
        cy.visit(Cypress.config('baseURL'),{ timeout: 80000 })
        cy.get('#wp-view[type="button"]').click({force:true})
        //cy.get('#customer_email').type(' ')
        cy.get('#customer_email-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#customer_firstname-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#customer_lastname-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#customer_address-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#customer_city-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#customer_phone-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#customer_ktp_file-error').should('contain.text','Kolom ini diperlukan.')
        cy.get('#agreement-error').should('contain.text','Anda harus menyetujui syarat dan ketentuan!')
    
    })

    it('Email tidak sesuai dengan format',()=>{
        cy.get('#customer_email').type('anda',{force:true})
        cy.get('#customer_email-error').should('contain.text','Silakan masukkan format email yang benar, contoh: anda@namadomain.com')
        cy.get('#customer_firstname').type('Joko')
        cy.get('#customer_lastname').type('Purwanto')
        cy.get('#customer_address').type('Blawong')
        cy.get('#customer_city').type('Bantul')
        cy.get('#customer_phone').type('085267788866')
        cy.get('#customer_mobile').type('08892822222')
        cy.get('#customer_ktp').type('11111111111')
        cy.get('#customer_sim').type('22222222222')
        cy.get('#customer_status').select('Pegawai Swasta')
        cy.get('#company_name').type('PT. Maju Lancar')
        cy.get('#company_phone').type('085267890888')
        cy.get('#company_address').type('Yogya')
    })

    it('Format No Telpon, No HP, No KTP, No SIM, Telepon Perusahaan bukan angka (huruf dan kombinasi angka+huruf)',()=>{
        cy.visit(Cypress.config('baseURL'),{ timeout: 80000 })
        cy.get('#customer_phone').type('085267788866aaa').invoke('val').wait(5000).should(value => {
          expect(Number.isInteger(+value), 'Inputan Harus Angka').to.eq(true)   // passes
          })
        cy.get('#customer_mobile').type('08892822222aaa').invoke('val').wait(5000).should(value => {
            expect(Number.isInteger(+value), 'Inputan Harus Angka').to.eq(true) // passes
          })
        cy.get('#customer_ktp').type('11111111111aa').invoke('text').wait(5000).should(value => {
            expect(Number.isInteger(+value), 'Inputan Harus Angka').to.eq(true)    // passes
          })
        cy.get('#customer_sim').type('22222222222aa').invoke('text').wait(5000).should(value => {
            expect(Number.isInteger(+value), 'Inputan Harus Angka').to.eq(true)   // passes
          })
        cy.get('#company_phone').type('085267890888aa--').invoke('text').wait(5000).should(value => {
            expect(Number.isInteger(+value), 'Inputan Harus Angka').to.eq(true) // passes
          })
    })
      
    it('Limit Inputan No Telpon, No HP, No KTP, No SIM, Telepon Perusahaan',()=>{
        cy.visit(Cypress.config('baseURL'),{ timeout: 80000 })
        const customerphone = '08120000123456'
        const customermobile = '08120000123456'
        const customerktp='1701180205890001'
        const customersim='123456798012345'
        const companyphone = '08120000123456'

        cy.get('#customer_mobile').type(customermobile).should('have.value', customerphone.substring(0,13)); 
        cy.get('#customer_ktp').type(customerktp).should('have.value', customerphone.substring(0,16)); 
        cy.get('#customer_sim').type(customersim).should('have.value', customerphone.substring(0,14)); 
        cy.get('#company_phone').type(companyphone).should('have.value', customerphone.substring(0,13)); 

    })

   
})